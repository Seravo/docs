---
layout: page
title: "wp-shadow-pull"
---


NAME
====

wp-shadow-pull - manual page for wp-shadow-pull git version ef6893b

DESCRIPTION
===========

usage: wp-shadow-pull \[-h\] \[\--version\] \[\--force\]
\[shadow\_to\_pull\]

Move data from a shadow instance to production. Given a shadow the tool
will overwrite almost all of the files located in the path
/data/wordpress/ on your production site. You may choose to import the
database from the shadow when given a user prompt. Before executing the
import, wp-shadow-pull creates a backup of your production environment.
Using this script can lead to some of your data being lost or your
production site breaking. Use only if you are a developer and/or
confident that you really want to replace the current files in
production with files from the shadow environment. Lists all available
shadows when called with no arguments.

positional arguments:
---------------------

shadow\_to\_pull

:   Name of the shadow to pull

optional arguments:
-------------------

**-h**, **\--help**

:   show this help message and exit

**\--version**

:   show program\'s version number and exit

**\--force**

:   Skip all user prompts, convenient for script usage

SEE ALSO
========

*wp-shadow-reset*(1), *wp-backup*(1)
