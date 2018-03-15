---
date: 2015-10-15T17:51:38.000Z
layout: page
title: "Seravo plugin - A mustuse plugin"
category: configuration
order: 3
summary: "All Seravo sites contain a mustuse plugin which is installed by default. \nIt adds minor WordPress fixes, new features and helps Seravo inform clients about service outages."
---

## How to download
The plugin is available on [Github](https://github.com/Seravo/seravo-plugin), so all users can see its open development and even pull request features.

You can download it here for testing purposes:

<a class="btn btn-default" href="https://github.com/Seravo/seravo-plugin/releases"><i class="glyphicon glyphicon-download-alt"></i> Download plugin from Github</a>

## List of features
<code>Version 1.5.4</code>

### Notifications from Seravo
These are used only for informing about service outages.

### Appends all logins to a log file and returns a 401 (unauthorized) http status code after a failed login
All logins are logged to <code>/data/log/wp-login.log</code>. This enables more relevant logging.

### Hides "New updates available" nagging
Updates are handled by Seravo so your clients don't need to worry about them. However,
Seravo updates can be manually disabled from the WordPress admin <b>Tools->Updates</b> page.

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

### List all domains associated with your account

Adds an admin page where you can view all your domains.

### Checks that WordPress is configured over SSL

Notifies you if you have forgotten to enable SSL in the WordPress siteurl or homeurl. Seravo provides free SSL for its customers and encourages them to look after the safety of their site.

## Configuration by using filters
Our plugin contains multiple filters which can be used to turn off the features mentioned above.

Add any of the filters below to the ```functions.php``` file of your theme:

```php
<?php
/*
 * This is a master switch to disable all modules.
 */
add_filter('seravo_disable_modules', '__return_false');

/*
 * Disable: Helpers for hiding useless notifications and small fixes in logging
 */
add_filter('seravo_use_helpers', '__return_false');

/*
 * Remove cache purge button from WP adminbar
 */
add_filter('seravo_use_purge_cache', '__return_false');

/*
 * Remove instance switcher from WP admin bar
 */
add_filter('seravo_show_instance_switcher', '__return_false');

/*
 * Disable: relative URLs in post content
 */
add_filter('seravo_use_relative_urls', '__return_false');

/*
 * Prevent hiding the domain alias from search engines
 */
add_filter('seravo_hide_domain_alias', '__return_false');

/*
 * Disable: Wordpress login log
 */
add_filter('seravo_use_login_log', '__return_false');

/*
 * Disable: Check that HTTPS is enabled in siteurl and homeurl
 */
add_filter('seravo_check_https', '__return_false');

/*
 * Hide admin menu pages, where
 * {PAGE} is one of: reports, backups, updates or domains
 */
add_filter('seravo_show_{PAGE}_page', '__return_false');

/*
 * Disable: Check that user has changed email address no-reply@seravo
 */
add_filter('seravo_check_default_email', '__return_false');
```
