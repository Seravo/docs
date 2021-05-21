---
layout: page
title: "Profile runtime with Xdebug & Webgrind"
order: 10
---

> **Note:** Xdebug is only for development sites. Use [Tideways]({{ site.baseurl }}/development/tideways ) on live production websites.

## What is Xdebug?

Xdebug is a debugger and profiler for PHP. We mainly use it as profiler and it's installed in the Vagrant box by default.

## Profiling pages with Xdebug and Webgrind

You can profile any page in Vagrant by visiting them and using the `?XDEBUG_PROFILE` paramater in the url.

This will generate a new dbkg dump which you can the analyze in your browser using webgrind.

### Example: Profile WP admin dashboard
1. Enter the Vagrant box with `vagrant ssh` and inside it run `wp-xdebug-on` to ensure Xdebug is active.
1. Visit: http://wordpress.local/wp-admin/?XDEBUG_PROFILE
1. Visit http://webgrind.wordpress.local/
1. Click **update** button and wait for webgrind to analyze the dump.
1. You can see the profiling of the admin page and look up slow functions which you can then optimize.

![Xdebug in Vagrant]({{site.baseurl}}/images/webgrind-example.png)

## Using the Xdebug Helper Chrome extension

Profiling and traces can easily also be triggered using the [Xdebug Helper Chrome extension](https://github.com/mac-cain13/xdebug-helper-for-chrome). For optimal operation use the settings:
* IDE key: vagrant
* Trace Trigger Value: XDEBUG_TRACE
* Profile Trigger Value: XDEBUG_PROFILE

![Xdebug in Vagrant]({{site.baseurl}}/images/xdebug-helper-settings.png)

## Using remote debugging with Xdebug

Xdebug can also be used for [remote live debugging](https://xdebug.org/docs/remote) with breakpoints and all. Please refer to your IDE for more information. A good example is the [Atom php-debug plugin documentation](https://atom.io/packages/php-debug) on the topic.
