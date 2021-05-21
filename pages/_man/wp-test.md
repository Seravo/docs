---
layout: page
title: "wp-test"
---


NAME
====

wp-test - manual page for wp-test git version 8235fae

SYNOPSIS
========

**wp-test** \[*-h*\] \[*\--version*\] \[*\--insecure*\] \[*\--debug*\]
\[*\--fail-fast*\]

DESCRIPTION
===========

Test that the WordPress installation works. Runs a set of standard
Seravo tests and any custom tests the site might have. Note, that if the
standard set of tests fail, user-provided tests will not be run at all.

For full documentation please read
https://seravo.com/docs/tests/ng-integration-tests/

Based on Codeception PHP testing framework. Any additional arguments are
passed as-is to \'codecept\'.

optional arguments:
-------------------

**\--insecure**

:   ignore HTTPS certificate issues

**\--fail-fast**

:   stop tests on first error that occurred

**\--debug**

:   display verbose debug information

**-h**, **\--help**

:   display this help and exit

**\--version**

:   display version and exit
