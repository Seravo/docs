---
layout: page
title: "wp-backup-status"
---


NAME
====

wp-backup-status - manual page for wp-backup-status git version 8235fae

DESCRIPTION
===========

usage: wp-backup-status \[options\]

List all backup increments currently available.

wp-backup-status is a shell program which lists all increments echo
known by rdiff-backup sorted by timestamp. Use this to find out what
kind of backups you are able to restore. This is an alias of
\"rdiff-backup **\--list-increment-sizes** /data/backups/data\".

optional arguments:
-------------------

**-h**, **\--help**

:   display this help and exit

**\--version**

:   display version and exit

SEE ALSO
========

*wp-backup-status*(1), *wp-backup*(1), *rdiff-backup*(1)
