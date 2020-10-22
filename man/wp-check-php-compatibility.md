---
title: "wp-check-php-compatibility"
---


# NAME

wp-check-php-compatibility - manual page for wp-check-php-compatibility
git version 8ecb3f3

# DESCRIPTION

usage: wp-check-php-compatibility \[-h\] \[--version\] \[path
\[phpversion\]\]

Check that the PHP code of the current WordPress installation, including
themes and plugins, is compatible with the PHP specified.

This is based on phpcs and it's PHP compatibility rulesets.

## positional arguments:

  - path  
    Path to site. Defaults to
    */data/wordpress/htdocs/wordpress/wp-content*

  - phpversion  
    PHP version. Defaults to 8.0.

## optional arguments:

  - **-h**, **--help**  
    display this help and exit

  - **--version**  
    display version and exit
