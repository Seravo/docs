---
layout: page
title: "What's new?"
category: get-started
date: 2018-11-12 11:26:00
order: 4
---

## Vagrant box seravo/wordpress 20181112.0.0

* More robust SSH connection handling. Running `vagrant up` should fail significantly less on SSH connection issues.
* Skip excess SSH key acceptance dialogs.
* Node.js upgraded to version 8.12.0 LTS with accompanying upgrades to Yarn, NPM and other Node.js tools.
* More robust startup of DBUS and Avahi.
* New commands
    * wp-xdebug-on
    * wp-xdebug-off
    * wp-debug-info
    * wp-php-compatibility-check
    * wp-theme-security-check
    * wp-db-info
* Updated man pages for all commands.
* Major updates to wp-test-ng command and Codeception framework.
* Includes also all the improvements available in Seravo's production and testing environments in last 4 months.


> **What's next?** If you want to test the next Vagrant box version before it is released, modify your `Vagrantfile` provider to use box `seravo/wordpress-beta` instead of the official `seravo/wordpress` box.
