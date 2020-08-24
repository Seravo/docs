---
title: "wp-activate-asset-proxy"
---


# NAME

wp-activate-asset-proxy - manual page for wp-activate-asset-proxy git
version fba2a66

# DESCRIPTION

usage: wp-activate-asset-proxy \[-h\] \[--version\]

Activate asset proxy to avoid need to download WordPress uploads
directory. Update Nginx settings to that requests to
/wp-content/uploads/\* are transparently proxied from the production
site, eliminating the need to download the uploads directory from the
production site to the local development site (or to shadow sites).

## optional arguments:

  - **-h**, **--help**  
    show this help message and exit

  - **--version**  
    show program's version number and exit
