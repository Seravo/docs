---
layout: page
title: "wp-shadow-reset"
---


NAME
====

wp-shadow-reset - manual page for wp-shadow-reset git version 8235fae

DESCRIPTION
===========

usage: wp-shadow-reset \[-h\] \[\--version\] \[\--force\]
\[shadow\_to\_reset\]

Move data from production to shadow instances. Delete and replace all
files in the /data/wordpress/ directory of a shadow with a clone from
production.

positional arguments:
---------------------

shadow\_to\_reset

:   Name of the shadow to reset

optional arguments:
-------------------

**-h**, **\--help**

:   show this help message and exit

**\--version**

:   show program\'s version number and exit

**\--force**

:   Skip user prompt

SEE ALSO
========

*wp-shadow-pull*(1), *wp-backup*(1)
