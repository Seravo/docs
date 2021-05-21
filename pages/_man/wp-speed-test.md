---
layout: page
title: "wp-speed-test"
---


NAME
====

wp-speed-test - manual page for wp-speed-test git version 8235fae

DESCRIPTION
===========

usage: wp-speed-test \[\--cache\] \[-h\] \[\--version\] \[URL\]

wp-speed-test measures the load time of PHP responses.

positional arguments:
---------------------

URL

:   The site URL to be tested. Defaults to using output of wp-url if the
    argument is not given.

optional arguments:
-------------------

**\--cache**

:   Measures cached results. This does not measure actual PHP speed.

**-h**, **\--help**

:   display this help and exit

**\--version**

:   display version and exit

SEE ALSO
========

*wp-load-test*(1)
