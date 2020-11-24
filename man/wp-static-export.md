---
title: "wp-static-export"
---


NAME
====

wp-static-export - manual page for wp-static-export git version 8235fae

DESCRIPTION
===========

usage: wp-static-export \[-h\] \[\--version\] \[URL \[OUTPUT\_DIR\]\]

Export a static version of the site. All pages and assets of the
WordPress site will be crawled and saved as static HTML files, which
might be useful in certain static file use cases.

Note! This tool is experimental and currently useful only to developers
who will further process the static files generated at */data/static*.

positional arguments:
---------------------

URL

:   Site URL to export. Defaults to the output of wp-url command.

OUTPUT\_DIR

:   Defaults to */data/static*.

optional arguments:
-------------------

**-h**, **\--help**

:   display this help and exit

**\--version**

:   display version and exit
