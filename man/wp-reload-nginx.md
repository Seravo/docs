---
title: "wp-reload-nginx"
---


# NAME

wp-reload-nginx - manual page for wp-reload-nginx git version fba2a66

# DESCRIPTION

usage: wp-reload-nginx \[-h\] \[--version\]

Reload Nginx configuration. If the configuration is invalid, the script
returns with error and Nginx continues with the old (valid) config.

Note: User specific Nginx configuration is located at
/data/wordpress/nginx/\*.conf.

## optional arguments:

  - **-h**, **--help**  
    display this help and exit

  - **--version**  
    display version and exit

# SEE ALSO

*wp-restart-nginx*(1)
