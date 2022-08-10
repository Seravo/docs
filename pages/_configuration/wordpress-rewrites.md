---
layout: page
title: "WordPress Rewrites"
order: 5
---
> **Note:** In most cases [redirects are better done in WordPress/PHP](https://help.seravo.com/en/knowledgebase/13/docs/33-how-do-i-add-custom-configurations-to-the-web-server) e.g. the [Redirection plugin](https://wordpress.org/plugins/redirection/), using the [https://codex.wordpress.org/Rewrite_API](https://codex.wordpress.org/Rewrite_API) or with custom code in e.g. theme functions.php. Use Nginx redirects only if there is no WordPress way to do it, for example when diverting traffic from the index.php to another custom PHP script on the same site.

## Basic redirects in WordPress/PHP

In PHP code you can express whatever redirection logic you want without being confined to the limited features on Nginx. For example there could be a file `mu-plugins/redirects.php` that would include:

```php
<?php
// Redirect any requests for www.example.fi or example.fi to example.com/fi/
if ( isset($_SERVER['HTTP_HOST']) && strpos($_SERVER['HTTP_HOST'], 'esimerkki.fi') !== false ) {
  header("Location: https://example.com/fi/", true, 301);
  exit; // Stop WordPress execution immediately as redirect headers were emitted
}
```

Another more elaborate one example would be:
```php
switch ($_SERVER['HTTP_HOST']) {

  # Enforce no www
  # Use 301 to make redirect permanent and cached
  # Use 302 for temporary (non-cached) redirects
  case "www.example.com":
    header("Location: https://example.com/", true, 301);
    break;

  # Multiple extra domains to same canonical domain
  # Note! Many plugins already do this automatically, e.g. Seravo Plugin or Polylang
  case "example.org":
  case "exmple.net":
  case "example.info":
    header("Location: https://example.com/", true, 301);
    break;

  # Localized domain to subfolder
  case "example.fi":
    header("Location: https://example.com/fi/", true, 301);
    break;

  # Localized domain to subfolder
  case "example.de":
    header("Location: https://example.com/de/", true, 301);
    break;

  default:
    header("Location: https://www.example.com/en/", true, 301);
}
exit; // Stop WordPress execution immediately as redirect headers were emitted
```

## Changing the domain of a site

If a site was using, say, example.com as its domain, and the goal was to rename the entire site to use example.net instead, one would need to:

    1) Change all occurrences of example.com to example.net in WordPress settings and contents.

    2) Set redirects to ensure all visitors that arrive to the site with the old domain are automatically redirected to the new domain. Redirects should use HTTP code 301 to signal to search engines and other bots that visit the site that the new domain is now the new canonical domain for the site.

### Changing the domain in WordPress settings and contents

This is easiest done on the command-line with [wp-cli](https://developer.wordpress.org/cli/commands/search-replace/):

```bash
# Replace all URLs
wp search-replace --all-tables //example.com //example.net
# Replace email addresses
wp search-replace --all-tables @example.com @example.net
# Verify with a database search there are no occurrences of the old domain
wp db search example.com
# Verify with there are no occurrences of the old domain in the site code either
wp-find-code example.com
# Purge caches to ensure all content is fresh from the database
wp-purge-cache
```

### Redirecting HTTP requests with old domain to new domain

Once the site settings and contents are in order, create `/data/wordpress/htdocs/wp-content/mu-plugins/redirects.php`:

```php
<?php
// Check that HTTP_HOST is set (so code is not run on wp-cli invocations)
if ( isset($_SERVER['HTTP_HOST']) && isset($_SERVER['REQUEST_URI']) ) {
  switch ( $_SERVER['HTTP_HOST'] ) {
    # Redirect all traffic to the new domain. This custom redirect is needed on
    # sites where the built-in WordPress canonical domain does not fully work,
    # e.g. sites with WPML or other odd plugins.
    #
    # Use 301 to make redirect permanent and cached
    # Use 302 for temporary (non-cached) redirects
    case 'example.com':
    case 'www.example.com':
      header('Location: https://example.net' . $_SERVER['REQUEST_URI'], true, 301);
      exit; // Stop WordPress execution immediately as redirect headers were emitted
  }
}
```

## Force canonical domain

Google and other search engines [don't like if the exact same content is served on multiple websites](https://support.google.com/webmasters/answer/139066?hl=en). If a website, say example.com, also has the domain example.net if should not serve the same content on both domains but instead choose which domain is the *canonical domain* and then redirect all alternative domains to it. The same applies for subdomains. Websites should choose if they are available under www.example.com or example.com and then redirect the other to the one.

Normally website developers don't need to bother with this, since [WordPress core automatically redirects](https://markjaquith.wordpress.com/2007/09/25/wordpress-23-canonical-urls/) visitors to the canonical domain based on the `home` setting. Also any site with the [Seravo Plugin will automatically enforce](https://github.com/Seravo/seravo-plugin/blob/master/lib/canonical-domain-and-https.php) both the canonical domain and the use of HTTPS to ensure all visits are protected.

However, certain plugins (e.g. WPML) that mess up the WordPress Rewrite API settings might break this, and in those rare cases a developer might need to create a custom `/data/wordpress/htdocs/wp-content/mu-plugins/redirect.php` file with the following contents:

```php
<?php
// Redirect any requests for www.example.com to example.com (non-www)
if ( isset($_SERVER['HTTP_HOST']) && isset($_SERVER['REQUEST_URI']) && $_SERVER['HTTP_HOST'] == 'www.example.com' ) {
  header("Location: https://example.com/" . $_SERVER['REQUEST_URI'], true, 301);
  exit; // Stop WordPress execution immediately as redirect headers were emitted
}
```

> **REMEMBER!** Test the redirect with `curl -IL -H Pragma:nocache <url>` to ensure it works!

### Understanding the difference of get_home() and get_siteurl() in WordPress

The `home_url()` (wp_options `home`) would be where you have set your homepage by setting `General > Settings "Site Address (URL)"` field.

The `site_url()` (wp_options `siteurl`) will always be the location where you can reach the site by appending on `/wp-admin` on the end, while `home_url()` would not reliably be this location.

#### Example

If you have:

    home    = https://example.com/store
    siteurl = https://example.com

It would follow that:
* https://example.com/ redirects to https://example.com/store/
* https://example.com/store/ can be found in all internal links at the site
* https://example.com/wp-admin/ stays as the WordPress management address

In this setup one could for example have a WordPress with WooCommerce running at the `/store` endpoint while the root `/` could be used for something completely else, for example a static website.

## Basic redirects in Nginx

Redirects from http://your-site.com/original -> https://example.com/new/url/

```
rewrite ^/original(.*)$ https://example.com/new/url$1 permanent;
```

Rewrite all old \*.html files to WordPress pages with pretty URLs:

```
rewrite ^/([0-9a-z-]+)\.html /$1/ permanent;
```

Serve country pages (example.es, example.de etc) from custom PHP file
```
if ($host ~ "example.es|example.de") {
  rewrite ^(/)?$ /country-pages/index.php last;
}
```

Please use something like [Rexexpal](http://www.regexpal.com/) to test your regular expressions and be sure to use `curl -IL` to test your redirects without having to hassle with the cache of a regular browser.

## Redirecting domains in Nginx

If you have multiple domains for your site and want to only use one of them:

```
if ($host ~ "old-subdomain.your-old-site.com") {
  return 301 https://your-site.com$request_uri;
}
```

## Testing redirects

Please use [curl](https://curl.haxx.se/) to test redirects. Using a browser for testing will not work as the browser in most cases will cache the first redirect and after that no changes will be visible when testing with a broser. Using `curl` with header `Pragma:no-cache` ensures there is no caching at all and it will print `location:` headers that show clearly what the redirect is.

Example:
```sh
$ curl -IL -H Pragma:no-cache www.example.org
HTTP/1.1 200 OK
X-Cache: BYPASS
Location: https://example.com/
Content-Length: 100

HTTP/1.1 200 OK
X-Cache: BYPASS
Content-Length: 1270
```

## Reviewing WordPress Rewrite API contents

If a site has many redirect plugins, language plugins and maybe even custom [WP Rewrite API rules](https://codex.wordpress.org/Rewrite_API) registered in the theme the overall situation can become complex. Easiest way to review all current rewrites is to use [wp-cli](https://developer.wordpress.org/cli/commands/rewrite/):

```
$ wp rewrite
usage: wp rewrite flush [--hard]
   or: wp rewrite list [--match=<url>] [--source=<source>] [--fields=<fields>] [--format=<format>]
   or: wp rewrite structure <permastruct> [--category-base=<base>] [--tag-base=<base>] [--hard]


$ wp rewrite flush
Success: Rewrite rules flushed.

$ wp rewrite list
+---------------------------------------+------------------------------------------+--------------------+
| match                                 | query                                    | source             |
+---------------------------------------+------------------------------------------+--------------------+
| sitemap\.xml$                         | index.php?the_seo_framework_sitemap=xml  | other              |
| sitemap\.xsl$                         | index.php?the_seo_framework_sitemap=xsl  | other              |
| ^wp-json/?$                           | index.php?rest_route=/                   | other              |
| ^wp-json/(.*)?                        | index.php?rest_route=/$matches[1]        | other              |
| ^index.php/wp-json/?$                 | index.php?rest_route=/                   | other              |
| ^index.php/wp-json/(.*)?              | index.php?rest_route=/$matches[1]        | other              |
| case/?$                               | index.php?post_type=case                 | other              |
| case/feed/(feed|rdf|rss|rss2|atom)/?$ | index.php?post_type=case&feed=$matches[1 | other              |
...
```

## Relative URLs and alternative wp-content locations

WordPress allows to set an alternative location for the `wp-content` directory by defining the `WP_CONTENT_URL` constant. This can also be used to set relative urls simply by replacing the default `https://example.com/wp-content` with simply `/wp-content`. See the `wp-config.php` in-line comments in the [Seravo WordPress project template](https://github.com/Seravo/wordpress/blob/master/htdocs/wp-config.php#L45-L47) for an example.
