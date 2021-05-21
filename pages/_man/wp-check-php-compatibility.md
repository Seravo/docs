---
layout: page
title: "wp-check-php-compatibility"
---


NAME
====

wp-check-php-compatibility - manual page for wp-check-php-compatibility
git version ef6893b

DESCRIPTION
===========

usage: wp-check-php-compatibility \[-h\] \[\--version\] \[\--php
\<phpversion\>\] \[path\]

Check that the PHP code of the current WordPress installation, including
themes and plugins, is compatible with the PHP specified.

This is based on phpcs and it\'s PHP compatibility rulesets.

positional arguments:
---------------------

path

:   Path to site. Defaults to
    */data/wordpress/htdocs/wordpress/wp-content*

optional arguments:
-------------------

**-h**, **\--help**

:   display this help and exit

**\--php** \<version\>

:   PHP version. Defaults to 7.4.

**\--version**

:   display version and exit
