---
title: "wp-last-ssh-logins"
---


# NAME

wp-last-ssh-logins - manual page for wp-last-ssh-logins git version
fba2a66

# DESCRIPTION

usage: wp-last-ssh-logins \[-h\] \[--version\] \[--user USER\]

List latest ssh login attempts. List last logins according to system
status history and failed logins based on wtmp and btmp.

## optional arguments:

  - **-h**, **--help**  
    show this help message and exit

  - **--version**  
    show program's version number and exit

  - **--user** USER  
    Analyze SSH publickey logins of given user. If not given, analyze
    the default WP user.
