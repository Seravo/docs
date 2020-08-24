---
title: "wp-check-http-cache"
---


# NAME

wp-check-http-cache - manual page for wp-check-http-cache git version
fba2a66

# DESCRIPTION

usage: wp-check-http-cache \[-h\] \[--version\] \[--no-https-verify\]
\[url\]

Seravo HTTP cache checker.

## positional arguments:

  - url  
    The URL you want to check. If not provided, the command will attempt
    to construct the URL using the domain from the WordPress
    installation.

## optional arguments:

  - **-h**, **--help**  
    show this help message and exit

  - **--version**  
    show program's version number and exit

  - **--no-https-verify**  
    Do not verify https request certificate.
