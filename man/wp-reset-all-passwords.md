---
title: "wp-reset-all-passwords"
---


NAME
====

wp-reset-all-passwords - manual page for wp-reset-all-passwords git
version 8235fae

DESCRIPTION
===========

usage: wp-reset-all-passwords \[-h\] \[\--version\] \[\--force\]
\[\--roles ROLES\]

> \[\--send-email\]

Reset passwords of all users. Reset passwords for all WordPress users.
Users are sent an automatic password reset notification email if
**\--send-email** is used.

optional arguments:
-------------------

**-h**, **\--help**

:   show this help message and exit

**\--version**

:   show program\'s version number and exit

**\--force**, **\--yes**

:   Do not ask for confirmation

**\--roles** ROLES

:   Reset passwords for all users that match the given comma separated
    list of roles. Reset passwords for all users if \'all\' is given.
    This is the default.

**\--send-email**

:   Send email to each user whose password is reset
