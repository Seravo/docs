---
title: "wp-load-test"
---


# NAME

wp-load-test - manual page for wp-load-test git version fba2a66

# DESCRIPTION

usage: wp-load-test \[--cache\] \[-h\] \[--version\] \[URL\]

wp-load-test is a simple command line tool to measure many consecutive
PHP requests the site can handle in a minute while still serving each
request in under 5 seconds. This test only uses a single PHP worker and
it bypasses the edge cache. The actual site will be capable of handling
much more traffic. If the response time of a single PHP request is much
above 0.500 seconds, please try to optimize the PHP code and run
wp-speed-test. If the response time is much below 0.100 seconds, then
this test is likely to trigger the flood protection and server will
yield 429 responses.

Defaults to using output of wp-url if URL argument is not given.

## optional arguments:

  - **--cache**  
    Measures cached results. This does not measure actual PHP speed.

  - **-h**, **--help**  
    display this help and exit

  - **--version**  
    display version and exit
