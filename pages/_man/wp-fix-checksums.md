---
layout: page
title: "wp-fix-checksums"
---


NAME
====

wp-fix-checksums - manual page for wp-fix-checksums git version 8235fae

SYNOPSIS
========

**wp-fix-checksums** \[*-h*\] \[*\--version*\]

DESCRIPTION
===========

Checks the WordPress core installation for modified files, and if any
are found, automatically re-installs the same WordPress version to
ensure the core files are unmodified.

Based on \'wp core verify-checksums\' with some additional logic. Only
\'wp core verify-checksum\' errors are addressed. Warnings are shown but
not fixed automatically.

optional arguments:
-------------------

**-h**, **\--help**

:   display this help and exit

**\--version**

:   display version and exit

SEE ALSO
========

*wp core*(1)
