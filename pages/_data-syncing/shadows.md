---
layout: page
title: "Staging instances (Shadows)"
order: 3
---

## Shadows

Shadows are a unique feature in Seravo that provides you with non-public instances of your website for testing and development purposes. Shadows are throw-away copies of the main site. You can reset the shadow to be a fresh copy of the main site at any time (with `wp-shadow-reset`), and do whatever testing and experiments in the shadow you wish without risking anything on the real live production site.

The shadows appear to have the same address as the real site, so it is as a true copy of the real site as possible. However, thanks to special routing, shadows are not the live site despite the appearance.

**Shadows are not intended to be permanent.** You should use it like a testing instance of the website. If a shadow is unused for en extended time, Seravo may delete it.


## Getting a Shadow

Email us at [help@seravo.com](mailto:help@seravo.com) and ask us for a shadow instance. You will have one opened up for you in no time.

It's also possible to have your own domain or subdomain for the staging environment. Please note that this shadows with their own domain is still in development so some functionalities are not yet fully implemented and there are known bugs. For example the command `wp-shadow-reset` and the **Exit Staging** button do not currently work with a staging environment using its own domain.

## Using a Shadow

### The Seravo Plugin

The Instance Switcher module in the Seravo plugin adds a simple interface to your WP-admin view, that allows you to easily switch between your Shadow and Production instances.

![Screenshot from the Seravo plugin]({{site.baseurl}}/images/instance-switcher.png)

### SSH/SFTP

You can SSH into your shadows and work on them via SSH/SFTP or git. When a new shadow is created you will receive the SSH/SFTP credentials to use with it.

Your WordPress login will remain unchanged, since the site is a copy of your production site when first created.

You can tell that you're in a shadow by looking at the `WP_ENV` environment variable. If you're in a shadow, it will be `staging` or `testing`, depending on what's applicable in your situation. Your production instance will have a `WP_ENV` value of `production`. Local Vagrant images and the like will have WP_ENV value `development`.

```bash
example_456def$ wp-list-env
...
WP_ENV: staging
```

### Reset the Shadow environment

#### Command line option (via SSH)

You can use the command `wp-shadow-reset` to copy the current production site over the chosen staging instance. The command has to be run on the production server.

```
user@example_456def:~$ wp-shadow-reset
No shadow specified, please run "wp-shadow-reset <shadow>" with one of the shadows below:
- example_123abc
- example_456def
```

The command requires you to choose the shadow environment you want to reset. The system will then ask if it's okay for you that the database and all files in `/data/wordpress` will be replaced with data from the production site.

After choosing yes, the shadow will be reset.

#### Graphical option (via wp-admin)

To reset a shadow from the WordPress admin area, navigate to Tools &gt; Site Status. Find the *Shadows* section on this page. Choose the shadow to be reset from the dropdown menu and expand the view by clicking *Move Data*. Launch the shadow reset by clicking *Reset from production*.

![Shadows overview in WordPress admin]({{site.baseurl}}/images/seravo-plugin-shadows.png)

## How does it work?

Under the hood, shadows work exactly the same as your production instance does, the only difference being that they have no public domain mapped to them.

Shadows have their own full Linux environment and their own database, completely separate from your production instance. You can use SSH to work on your shadow instances in precisely the same way as you can with your production instance.

### The Shadow Cookie

To view your shadow in the browser, a special cookie called `seravo_shadow` must be set.

The value of the *seravo_shadow cookie* determines which shadow instance will be served to your browser.

Example:

```
example_123abc (production)
example_456def (staging)
```

Setting a cookie `seravo_shadow=456def;path=/` will return the staging instance to your browser.

The Seravo plugin handles these cookies easily for you.

You can also use GET parameters to set these cookies as described below.

### Direct link to Shadow

You can set the Shadow cookie easily via a GET parameter in the url.

Example: https://example.com/?seravo_shadow=456def

The link above would set the cookie `seravo_shadow=456def;path=/` in your current browser session.

### Curl to shadow

With `curl` you can fetch a file from the shadow in the following way:

```
curl -iLs https://example.com/test/?seravo_shadow=456def"
...
x-container: examplecom_456def
...
```

To verify that the HTTP reply came from the shadow environment, check that the `x-container` header reports the shadow identifier.

When a browser interacts with the shadow site, there is always a shadow cookie set all goes well. However, when using code or the command-line, the shadow cookie or shadow argument must be used. E.g. on how to successfully fetch data from the shadow WP-JSON API form the command line:

```
# curl with cookie
curl -iLs --cookie "seravo_shadow=456def;path=/" https://example.com/wp-json/wp/v2/
# curl with argument
curl -iLs https://example.com/wp-json/wp/v2/?seravo_shadow=456def
```

### Caveat: 3rd party WP plugins may not set the shadow cookie

Third party WordPress plugins may depend on the WordPress REST API. If they call this API without including the shadow cookie (e.g. the request does not come from visitors browser but from the server itself or elsewhere), the production WP instance will be called as the shadow cookie is missing. This is not expected behavior and can lead to plugin errors or data loss on production servers.

An example of such a plugin is [Mailchimp for WooCommerce](https://wordpress.org/plugins/mailchimp-for-woocommerce/). This can only be resolved by modifying the plugin code to add the shadow cookie to the headers of the REST request, or using a GET parameter. Below is an example of [a line](https://github.com/mailchimp/mc-woocommerce/blob/master/bootstrap.php#L951) that can be added for the plugin mentioned above:
```
$headers['cookie'] = 'seravo_shadow=<MY_SHADOW_ID>;';
```

To be safe, such sites should only use development environments that have a custom domain assigned (contact Seravo's customer support to get a shadow with a custom domain).
