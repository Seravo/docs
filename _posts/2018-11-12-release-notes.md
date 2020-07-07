---
layout: page
title: "What's new?"
category: get-started
date: 2018-11-12 11:26:00
order: 4
---
## Vagrant box seravo/wordpress 20200707.0.0

* Many minor version upgrades across the box, e.g the headless Chrome updated to version 83
* Tools such as Adminer, Mailcatcher and Webgrind now all run under `/.seravo/`, e.g. `https://wordpress.local/.seravo/mailcatcher/`. This unifies the address at which the services are available in Vagrant, Docker, staging shadows and in production.
* In the wp-test system the Seravo Codeception library had `getWPSiteURL()` renamed into `getWPURL()` to clarify that it is not the WordPress `siteurl` value but actually the `home` value, which always tell what is tha front page of the WordPress site.
* PHP 5.6 is no longer available. If you need PHP 5.6, use the previous Vagrant box [v20200130.0.0](https://app.vagrantup.com/seravo/boxes/wordpress/versions/20200130.0.0)  or the Docker image tagged with [-last-with-php5](https://hub.docker.com/r/seravo/wordpress/tags).
* To align local development environment with production and shadow environment capabilities, the GCC compiler has been removed. In rare cases some NodeJS modules cannot be built anymore, but it should not be an issue since npm should always install pre-build modules as long as the `package.json` contents is up-to-date with recent NodeJS versions and module versions. If Gulp or node-sass fails to install, please check that your `package.json` is recent enough (compare to [Seravo/WordPress template](https://github.com/Seravo/wordpress/blob/master/package.json)) or run `wp-fix-project`.

## Vagrant box seravo/wordpress 20200130.0.0

* PHP 7.4 is now available in the development environment (was previously only in production)
* WP-CLI upgraded to version 2.4, and many other minor version upgrades across the box
* Codeception upgraded to version 3.1.2 and the headless Chrome to version 79
* New command `wp-db-size` to show how much disk space the database uses per table, and updated `wp-db-info` to show what type of rows are most common in selected tables
* Command `wp-test` extended to automatically show PHP error log contents on failure
* Bugfix: calling `phpcbf` now launches the correct binary
* Multiple improvements in `vagrant up` for speed and reliability
* Node.js updated to version 12.13, along with NPM to 6.12 and Yarn to 1.21
* The environment also ships preinstalled Gulp, Grunt, Webpack, SASS and a few other very common tools
* This was the last box to ship PHP 5.6 and Bower (JavaScript dependency manager)

## Vagrant box seravo/wordpress 20191008.0.0

* WP-CLI upgraded to version 2.3, and many other minor version upgrades across the box
* XDebug is disabled by default to improve PHP speed. Run `wp-xdebug-on` to enable it
* SASS and webpack-cli are now pre-installed since they are so common
* Deprecated `wp-makepot` in favor of new `wp i18n makepot`
* Automatically run 'wp cache flush' after database imports so new contents always takes effect
* Fixed bug in Adminer and Webgrind PHP 7.3 compatibility
* Multiple bugfixes to make the box startup more reliable
* This was the last version to ship the Ruby based `wp-test-legacy` tool

## Vagrant box seravo/wordpress 20190513.0.0

* Includes latest versions of PHP and modules, wp-cli and in general all software
* Latest version of [wp-test using headless Chrome and Codeception]({{ site.baseurl }}{% post_url 2018-09-21-ng-integration-tests %}) while old and deprecated Rspec based testing system version is still available under the name `wp-test-legacy`.
* Many new commands:
  * Improved `wp-pull-production-db` that is also capable of doing an automatic rename of the main site in a WordPress Network installation. Subdomain renames still need to be taken care manually by the developer, e.g. using a small custom rename script. Network users will also enjoy the handy `wp-network-status` which will describe the state of a WordPress Network install and help to quickly identify mismatches in config files and database.
  * New commands `wp-pull-production-plugins` and `wp-pull-production-themes` for automating bootstrapping a local development environment for sites that don't have a custom `composer.json` already set up.
  * New command `wp-fix-project` to help update and compare base project files to those of the upstream [Seravo/WordPress](https://github.com/Seravo/wordpress) project template.
  * New command `wp-remote-db` exposes the MariaDB database to be accessible outside the virtual machine for developers who want to use database management tools on their own machine.
* A long list of small bug fixes and minor updates, including getting rid of the annoying extra `htdocs/htdocs` symlink.

## Vagrant box seravo/wordpress 20190122.0.0

* Introduce PHP 7.3
* WP-CLI upgraded to version 2.1, and many other minor version upgrades across the box
* WordPress 5.0 full compatibility
* Latest version of [wp-test-ng using headless Chrome and Codeception]({{ site.baseurl }}{% post_url 2018-09-21-ng-integration-tests %})
* Legacy testing system available both via `wp-test-legacy` and `wp-test`. The latter one is planned to start to point to `wp-test-ng` on March 31st, 2019.
* New command `wp-fix-languages` to automatically install and update language packs in WordPress
* Add deprecation warning to `wp-makepot` if favor of [wp i18n](https://developer.wordpress.org/cli/commands/i18n/)
* Bugfixes related to Avahi/Bonjour and Xdebug debugger
* PHP-Pear has been removed temporarily due to [security concerns over potentially backdoored Phars](https://twitter.com/pear/status/1086634389465956352)

## Vagrant box seravo/wordpress 20181112.0.0

* More robust SSH connection handling. Running `vagrant up` should fail significantly less on SSH connection issues.
* Skip excess SSH key acceptance dialogs
* Node.js upgraded to version 8.12.0 LTS with accompanying upgrades to Yarn, NPM and other Node.js tools
* More robust startup of DBUS and Avahi
* New commands
    * wp-xdebug-on
    * wp-xdebug-off
    * wp-debug-info
    * wp-php-compatibility-check
    * wp-theme-security-check
    * wp-db-info
* Updated man pages for all commands
* Major updates to wp-test-ng command and Codeception framework
* Includes also all the improvements available in Seravo's production and testing environments in last 4 months

# Test Seravo/WordPress-beta

If you want to test the next Vagrant box version before it is released, modify your `Vagrantfile` provider to use box `seravo/wordpress-beta` instead of the official `seravo/wordpress` box.

![Activate Seravo/WordPress-beta in Vagrantfile]({{site.baseurl}}/images/seravo-wordpress-beta.png)
