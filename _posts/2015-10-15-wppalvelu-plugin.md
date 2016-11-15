---
date: 2015-10-15T17:51:38.000Z
layout: page
title: "Seravo plugin - Mustuse plugin"
category: configuration
order: 3
summary: "Seravo sites contain a mustuse plugin which is installed in all sites by default. \nIt adds small WordPress fixes, new features and helps Seravo to inform clients about service outages."
published: true
---

## How to get
Plugin is available in [Github](https://github.com/Seravo/seravo-plugin) so all users can see it's open development and even pull request features.

You can download it here for testing purposes:

<a class="btn btn-default" href="https://github.com/Seravo/seravo-plugin/releases"><i class="glyphicon glyphicon-download-alt"></i> Download plugin from Github</a>

## List of Features

### Shows notifications from Seravo
These are used only for informing about service outages.

### Returns 401 (unauthorized) http status code after failed login.
This is used for more relevant logging.

### Hides update nagging
Updates are handled by Seravo so your clients don't need to worry about them.

### Uses nocache headers if the site is in development mode
Makes development with clients so much easier.

Imagine situation where your client sees the page in development and then the client doesn't know how to empty the browser cache later on.

### Adds Purge Cache button in adminbar
This helps you to empty your cached pages.

This is also available as command: ``` $ wp-purge-cache ``` as seen in [commands]({% post_url 2015-10-13-available-commands %}).

### Make urls content relative
This makes migration easier and helps when you need to switch your siteurl when publishing your site.

> **Note:** relative urls are automatically changed into absolute urls when using feeds (rss,atom...)

### Allows login to wp-admin with secure SSL client certificate

This helps admins and clients which have multiple sites in Seravo. If You have multiple sites in Seravo you can request personal SSL-certificate from [admins](mailto:wordpress@seravo.com).

## Configuration by using filters
Plugin contains multiple filters which you can use to turn off features mentioned above.

Add any of these to ```functions.php``` in your theme:

```php
<?php
/*
 * This is a master switch to disable all modules.
 */
add_filter('wpp_disable_modules', '__return_false');

/*
 * Disable: Helpers for hiding useless notifications and small fixes in logging
 */
add_filter('wpp_use_helpers', '__return_false');

/*
 * Disable: SSL certificate login through /wpp-login endpoint
 */
add_filter('wpp_use_client_certificate_login', '__return_false');

/*
 * Remove cache purge button from the WP adminbar
 */
add_filter('wpp_use_purge_cache', '__return_false');

/*
 * Disable: relative urls in post content
 */
add_filter('wpp_use_relative_urls', '__return_false');
```
