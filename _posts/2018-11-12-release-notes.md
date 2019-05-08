---
layout: page
title: "What's new?"
category: get-started
date: 2018-11-12 11:26:00
order: 4
---

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
