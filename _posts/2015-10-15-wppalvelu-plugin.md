---
date: 2015-10-15T17:51:38.000Z
layout: page
title: "Seravo plugin - A mustuse plugin"
category: configuration
order: 3
summary: "All Seravo sites contain a mustuse plugin which is installed by default. \nIt adds minor WordPress fixes, new features and helps Seravo inform clients about service outages."
published: true
---

## How to download
The plugin is available on [Github](https://github.com/Seravo/seravo-plugin), so all users can see its open development and even pull request features.

You can download it here for testing purposes:

<a class="btn btn-default" href="https://github.com/Seravo/seravo-plugin/releases"><i class="glyphicon glyphicon-download-alt"></i> Download plugin from Github</a>

## List of features

### Notifications from Seravo
These are used only for informing about service outages.

### Returns a 401 (unauthorized) http status code after a failed login.
Enables more relevant logging.

### Hides "New updates available" nagging
Updates are handled by Seravo so your clients don't need to worry about them.

### Uses nocache headers if the site is in development mode
Makes development with clients so much easier.

Imagine a situation where your client sees the page in development and then doesn't know how to empty the browser cache later on.

### Adds a Purge Cache button to the admin bar
This feature simplifies emptying your cached pages.

Purging the cache is also achievable via command line: ``` $ wp-purge-cache ``` as seen in [commands]({{ site.baseurl }}{% post_url 2015-10-13-available-commands %}).

### Makes URLs content relative
This makes migration and switching the site URL easier when publishing your site.

> **Note:** relative URLs are automatically changed into absolute URLs when using feeds (rss, atom, etc...)

### Enables login to wp-admin with a secure SSL client certificate

This helps admins and clients who have multiple sites in Seravo. If you have multiple sites in Seravo, you can request a personal SSL-certificate from our [admins](mailto:wordpress@seravo.com).

## Configuration by using filters
Our plugin contains multiple filters which can be used to turn off the features mentioned above.

Add any of the filters below to the ```functions.php``` file of your theme:

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
 * Remove cache purge button from WP adminbar
 */
add_filter('wpp_use_purge_cache', '__return_false');

/*
 * Disable: relative URLs in post content
 */
add_filter('wpp_use_relative_urls', '__return_false');
```
