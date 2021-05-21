---
layout: page
title: "PHP versions"
order: 4
summary: "Seravo.com always offers the latest version of PHP for fast and secure sites"
---

## PHP versions

The PHP version can be modified by making a (or modifying an existing) file in `/data/wordpress/nginx/*.conf` that contains the line:
```
set $mode php8.0;
```

Currently available options are: `php8.0`, `php7.4`, `php7.3` and `php7.2`. The older PHP options have been deprecated. Seravo used to also offer PHP5 and [Facebook's Hip Hop Virtual Machine (HHVM)](http://hhvm.com) but not anymore, as those have been obsoleted by newer PHP versions.

If for some reason an older PHP version is preferred, just add a line to Nginx conguration for example in a file named `/data/wordpress/nginx/php.conf`
```
set $mode php7.3;
```

Remember to reload the Nginx configuration afterwards with `wp-restart-nginx`.

The same instructions work both in our Vagrant box and on the live server. When you make the Nginx configuration part of your development repository, all your development, staging and production environments will use the same PHP back-end across the board.

## PHP modules and extensions

Seravo currently offers PHP 8.0 with the following modules and extensions:

```
$ php -m
[PHP Modules]
bcmath
calendar
Core
ctype
curl
date
dom
exif
FFI
fileinfo
filter
ftp
gd
gettext
gmp
hash
iconv
igbinary
imagick
imap
intl
json
ldap
libxml
mbstring
memcache
mysqli
mysqlnd
openssl
pcntl
pcre
PDO
pdo_mysql
pdo_sqlite
Phar
posix
readline
redis
Reflection
session
shmop
SimpleXML
soap
sockets
sodium
SPL
sqlite3
ssh2
standard
sysvmsg
sysvsem
sysvshm
tideways
tidy
tokenizer
xdebug
xml
xmlreader
xmlrpc
xmlwriter
xsl
Zend OPcache
zip
zlib

[Zend Modules]
Xdebug
Zend OPcache
```

You can also obtain this list by running `php -m` on the command line. An even more extended list of PHP features and settings enabled can be obtained with `php -i`. If you have requests about new modules or features, you can contact our customer support or file an issue at https://github.com/Seravo/WordPress/.
