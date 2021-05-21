---
layout: page
title: "wp-restart-nginx"
---


NAME
====

wp-restart-nginx - manual page for wp-restart-nginx git version 8235fae

DESCRIPTION
===========

usage: wp-restart-nginx \[-h\] \[\--quiet\] \[\--version\]

Restart Nginx. The tool first shows what would change in the new
configuration unless **\--quiet** is given. Then it validates the
configuration. If the configuration is invalid, the tool returns with
error. If configuration is valid, PHP is restarted with wp-php-restart.
Then Nginx is restarted, briefly interrupting the service (i.e. clients
can experience errors).

Note: User specific Nginx configuration is located at
/data/wordpress/nginx/\*.conf.

optional arguments:
-------------------

**\--quiet**

:   do not display configuration changes

**-h**, **\--help**

:   display this help and exit

**\--version**

:   display version and exit

SEE ALSO
========

*wp-reload-nginx*(1), *wp-restart-php*(1)
