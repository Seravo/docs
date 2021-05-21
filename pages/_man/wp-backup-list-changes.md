---
layout: page
title: "wp-backup-list-changes"
---


NAME
====

wp-backup-list-changes - manual page for wp-backup-list-changes git
version 8235fae

SYNOPSIS
========

**wp-backup-list-changes** \[*-h*\] \[*\--version*\]
\[*\--skip-database*\]

DESCRIPTION
===========

Lists all files known by rdiff-backup sorted by timestamp.

Use this to find out what files really changed in the system, as the
file attribute mtime is not a reliable source of information.

For more detailed information, use \'rdiff-backup\' commands directly.

For example, to find out how the current data differs from latest backup
run:

> rdiff-backup **\--exclude** */data/backups* **\--compare-at-time** now
> */data* /data/backs/data/

optional arguments:
-------------------

**-h**, **\--help**

:   display this help and exit

**\--version**

:   display version and exit

SEE ALSO
========

*wp-backup-list-changes-since*(1), *wp-list-files-mtime*(1),
*wp-db-dump*(1), *rdiff-backup*(1)
