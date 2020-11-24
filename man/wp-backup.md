---
title: "wp-backup"
---


NAME
====

wp-backup - manual page for wp-backup git version 8235fae

SYNOPSIS
========

**wp-backup** \[*-h*\] \[*\--version*\] \[*\--skip-database*\]

DESCRIPTION
===========

Makes a backup of the entire */data* directory into
*/data/backups/data*.

The backup includes all WordPress files and a fresh database dump.

Based on \'rdiff-backup\' with some additional logic.

optional arguments:
-------------------

**\--skip-database**

:   skip making a fresh database dump and only backup files

**-h**, **\--help**

:   display this help and exit

**\--version**

:   display version and exit

SEE ALSO
========

*wp-backup-list-changes*(1), *wp-backup-list-changes-since*(1), *wp
db*(1), *wp-db-dump*(1), *rdiff-backup*(1)
