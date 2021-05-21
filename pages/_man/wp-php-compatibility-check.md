---
layout: page
title: "wp-php-compatibility-check"
---


NAME
====

wp-php-compatibility-check - manual page for wp-php-compatibility-check
git version 8235fae

DESCRIPTION
===========

usage: wp-php-compatibility-check \[-h\] \[\--version\] \[path
\[phpversion\]\]

Check that the PHP code of the current WordPress installation, including
themes and plugins, is compatible with the PHP specified.

This is based on phpcs and it\'s PHP compatibility rulesets.

positional arguments:
---------------------

path

:   Path to site. Defaults to
    */data/wordpress/htdocs/wordpress/wp-content*

phpversion

:   PHP version. Defaults to 7.4.

optional arguments:
-------------------

**-h**, **\--help**

:   display this help and exit

**\--version**

:   display version and exit
