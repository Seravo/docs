---
layout: page
title: "wp-fix-wp-content-symlink"
---


NAME
====

wp-fix-wp-content-symlink - manual page for wp-fix-wp-content-symlink
git version 8235fae

SYNOPSIS
========

**wp-fix-wp-content-symlink** \[*-h*\] \[*\--version*\] \[*\--force*\]

DESCRIPTION
===========

Check that a correct wordpress/wp-content -\> ../wp-content symlink is
found so that the WordPress installation would work correctly.

If not found, tries to fix the WordPress installation and create the
symlink correctly.

optional arguments:
-------------------

**\--force**

:   force wp-content symlink fix, useful if the fix could not otherwise
    be applied automatically

**-h**, **\--help**

:   display this help and exit

**\--version**

:   display version and exit
