---
layout: page
title: "wp-test-whitelist"
---


NAME
====

wp-test-whitelist - manual page for wp-test-whitelist git version
8235fae

DESCRIPTION
===========

usage: Command for whitelisting wp-test errors and warnings

Whitelist Chrome developer console errors so that they don\'t get caught
when running wp-test. Occasionally, the Chrome developer console outputs
false positive errors that should just be ignored by wp-test.

You can whitelist an error output by either typing in the whole error
string or whitelist many similar errors by utilizing regular expression.
You can also specify, if the message you\'re whitelisting, is an error
or a warning.

Whitelist a single message

> wp-test-whitelist **\--add** \"https://example.com/favicon.ico 404
> (Not Found)\"

Whitelist multiple errors with regex

> wp-test-whitelist **\--add**
> \".\*example\\.com/mylibrary\\.js.\*404.\*\" **\--regex**

Read more about whitelisting:
-----------------------------

> https://seravo.com/docs/tests/ng-integration-tests/\#howto-whitelist-specific-harmless-chrome-console-errors

optional arguments:
-------------------

**-h**, **\--help**

:   show this help message and exit

**\--version**

:   show program\'s version number and exit

**\--list**

:   Show a list of whitelist entries

**\--add** MESSAGE

:   Whitelist given message

**\--delete**

:   Unwhitelist given message

**\--reset**

:   Clear the whitelist

**\--error**

:   Specify messages\'s level to be error

**\--warning**

:   Specify messages\'s level to be warning

**\--regex**

:   Use regular expression
