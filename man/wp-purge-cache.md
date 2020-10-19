---
title: "wp-purge-cache"
---


# NAME

wp-purge-cache - manual page for wp-purge-cache git version fba2a66

# DESCRIPTION

usage: wp-purge-cache \[options\]

Purge nginx proxy cache, WordPress object cache, WordPress rewrite cache
and PageSpeed cache. Restart nginx.

Note: wp-purge-cache does nothing in a development environment. It is
only effective in production/staging (shadow).

## optional arguments:

  - **-h**, **--help**  
    display this help and exit

  - **--version**  
    display version and exit

# SEE ALSO

*wp-flush-cache*(1)