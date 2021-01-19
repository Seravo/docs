---
layout: page
title: "Custom error pages"
category: configuration
date: 2016-08-24 23:11:00
order: 3
summary: "Customize error pages to better serve the audience of a particular site"
---

## Custom error pages

In some maintenance scenarios it might be handy to be able to show custom error pages.

### Flexible maintenance page

If there is a need to temporarily divert all traffic to a single static page (for example to show an error message or a maintenance message) the best way to accomplish this is by adding to your `/data/wordpress/nginx/custom.conf` a line like:

```
rewrite ^(.*)$ /maintenance.html break;
```

The target of the rewrite can actually be any URL and the temporary view shown to visitors can also reside on an entirely different server. This is the recommended way to implement a static maintenance page.

## WordPress core maintenance module

Also keep in mind that the built-in WordPress drop-in `maintenance.php` and `.maintenance` files can be used in the Seravo environment just like anywhere else. For details see [wp_maintenance in the WordPress codex](https://codex.wordpress.org/Function_Reference/wp_maintenance).

### Plain static maintenance page (not recommended)

If a file named `index.html` is placed in the `/data/wordress/htdocs/` folder, it will take precedence over the existing `index.php` file that normally loads WordPress. A static file will always work even if PHP is broken for some reason. A static page might also be useful during a DDOS attack as static content can be served at a much higher rate than PHP generated content.

### Custom database connection error page

If WordPress is unable to connect to the database, the PHP file `/data/wordpress/htdocs/wp-content/db-error.php` will be displayed instead. This file may be customized to show any static or dynamic content instead of the default template.

### Custom PHP fatal error and parse error pages

As a general rule, most errors in PHP should be handled by PHP. WordPress does this pretty well but it can be extended by using custom shutdown handler to catch PHP fatal errors and PHP parse errors. These normally make PHP emit HTTP code 500 and an empty page. The empty page is very unhelpful for visitors, because their browser will either show just a blank page or a very generic error page depending on what is built into the browser.

The following code example shows how to modify `index.php` to show a custom static file `500.html` on fatal PHP errors instead of an empty response. This can be used to show for example a sitemap, contact information, maintenance notice or whatever seems fit for the page.

```php
<?php
/*
 * WordPress includes code for most error handling
 * apart from parse errors and fatal errors.
 * With this function a custom error message will be
 * shown when those errors are catched.
 *
 * Normally PHP would emit HTTP code 500 with no
 * payload on fatal errors. This function adds
 * a customized payload to inform users about whatever.
 */
function customErrorHandlerAtShutdown() {
  $error = error_get_last();
  if ( $error ) {
    // Error constants listed at
    // http://php.net/manual/en/errorfunc.constants.php
    switch ( $error['type'] ) {
      case E_ERROR: // PHP Fatal error
      case E_PARSE: // PHP Parse error
        header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
        header("Cache-Control: post-check=0, pre-check=0", false);
        header("Pragma: no-cache");
        include '500.html';
        break;
    }
  }
}
register_shutdown_function('customErrorHandlerAtShutdown');


// WordPress view bootstrapper
define('WP_USE_THEMES', true);
require(dirname( __FILE__ ) . '/wordpress/wp-blog-header.php');
```

This code also makes sure that error pages are not cached by any step in the HTTP connection.

### Custom error pages from Nginx

**This is not a recommended practice.** Almost always error handling should be done in some intelligent fashion in WordPress/PHP code. There should be no need to resort to error_page directives in Nginx.

The following directive is however possible to do if one wants Nginx to server error pages instead of PHP. Below is an example of how a file called `/data/wordpress/nginx/error-pages.conf` could look like:

```
fastcgi_intercept_errors on;
error_page 500 501 502 /wp-content/wp-error.php;
error_page 499 /wp-content/499.html;
```

This error page is independent of the WordPress stack and will work despite PHP errors in WordPress code. This will however mask all PHP output on errors and thus is **almost always a bad idea**. Also layers higher up in the caching stack might pick up the error code and replace the response with something else conveying the same error.
