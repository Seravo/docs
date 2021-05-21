---
layout: page
title: "Seravo plugin - A must-use plugin"
order: 3
summary: "All Seravo sites contain a must-use plugin which is installed by default. \nIt adds minor WordPress fixes, new features and helps Seravo inform clients about service outages."
---

## How to download
The plugin is available on [Github](https://github.com/Seravo/seravo-plugin), so all users can see its open development and even do pull requests for features.

You can download the plugin here for testing purposes:

<a class="btn btn-default" href="https://github.com/Seravo/seravo-plugin/releases"><i class="glyphicon glyphicon-download-alt"></i> Download plugin from Github</a>

## Examples of features

For full documentation, see the plugin [README on Github](https://github.com/Seravo/seravo-plugin).

### Shadow reset-button
Adds the feature for resetting a staging environment from admin pages.

### Enforce the use of https
If the site and home addresses of the WordPress site include the https-prefix, it is enforced by redirections.

### Disable weak passwords
Strong passwords are enforced by not allowing the user to update their profile with a weak password.

### Find and remove cruft files, themes and plugins
Seravo-plugin lists files, themes and plugins that are considered unnecessary, obsolete or outright bad in the admin page with the option for removing them..

### Technical contact email setting
You can set your technical contact email from the admin view.

### Database statistics view
Status of the database is shown in the admin view.

### Moving between shadow/production
Instance switcher is not loaded when in a development environment.

### Optimize images
You can opt in to optimize your websites images and adjust the parameters.

### Run tests on WordPress core functionalities
You can run `wp-test` as seen in [commands]({{ site.baseurl }}/get-started/available-commands ).

### Logs page
Adds an admin page where you can view all your website logs.

### Appends all logins to a log file and returns a 401 (unauthorized) http status code after a failed login
All logins are logged to <code>/data/log/wp-login.log</code>. This enables more relevant logging.

### Hides "New updates available" nagging
All updates are handled by Seravo so your clients don't need to worry about them. However,
Seravo updates can be manually disabled from the WordPress admin <b>Tools->Updates</b> page.

### Use nocache headers if the site is in development mode
Makes development with clients so much easier.

Imagine a situation where your client sees the page in development and then doesn't know how to empty the browser cache later on.

### Add a Purge Cache button to the admin bar
This feature simplifies emptying your cached pages.

Purging the cache is also achievable via command line: `wp-purge-cache` as seen in [commands]({{ site.baseurl }}/get-started/available-commands ).

### Enable login to wp-admin with a secure SSL client certificate

This helps the admins and clients who have multiple sites in Seravo. If you have multiple sites in Seravo, you can request a personal SSL-certificate from our [admins](mailto:help@seravo.com).

### List all domains associated with your account

Adds an admin page where you can view all your domains. You can also inspect your DNS-records for each domain.

### Checks that WordPress is configured over SSL

Notifies you if you have forgotten to enable SSL in the WordPress siteurl or homeurl. Seravo provides free SSL for its customers and encourages them to ensure the safety of their site.

## Configuration by using filters
Our plugin contains multiple filters which can be used to turn off the features mentioned above.

Add any of the filters below to the `functions.php` file of your theme:

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
 * Manage which users are able to see and use the purge button in WP-adminbar.
 * Default value is same as below: users need to have the 'edit_posts' capability.
 */
add_filter('seravo_purge_cache_capability', function () {
  return 'edit_posts';
});

/*
 * Remove instance switcher from WP admin bar
 */
add_filter('seravo_show_instance_switcher', '__return_false');

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
