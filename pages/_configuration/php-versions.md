---
layout: page
title: "PHP versions"
order: 1
summary: "Seravo.com always offers the latest version of PHP for fast and secure sites"
---

## PHP versions

The PHP version can be changed with `wp-php-set-version 8.3` or by modifying
the file in `/data/wordpress/nginx/*.conf` that contains the line:

```
set $mode php8.3;
```

Currently available options are: `php8.3`, `php8.2`, `php8.1`, `php8.0`, `php7.4`, `php7.3` and `php7.2`.
Remember to reload the Nginx configuration afterwards with `wp-restart-nginx`.

The same instructions work both in our Vagrant box and on the live server. When you make the Nginx configuration
part of your development repository, all your development, staging and production environments will use the same
PHP back-end across the board.

## PHP modules and extensions

You can obtain the list of modules by running `php -m` on the command line. An even more extended list of PHP features
and settings enabled can be obtained with `php -i`. If you have requests about the new modules or features, you can contact
our customer support or file an issue at [https://github.com/Seravo/WordPress](https://github.com/Seravo/WordPress).

Seravo currently offers PHP 8.3 with the following modules and extensions:

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
mongodb
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
random
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
xmlwriter
xsl
Zend OPcache
zip
zlib

[Zend Modules]
Xdebug
Zend OPcache
```
