---
layout: page
title: Default values
order: 4
summary: This page contains default values like addresses, usernames and passwords used in Vagrant box.
---
## Vagrant
### Default credentials

WordPress:

```
user:     vagrant
password: vagrant
```

MariaDB (MySQL):

```
# For root
user:     root
password: root

# For WordPress DB
user:     vagrant
password: vagrant
```
### Default Addresses for the box
The default address can be changed by [editing config.yml]({{ site.baseurl }}/development/configure-vagrant-box )

#### WordPress
http://wordpress.local

#### Adminer
https://wordpress.local/.seravo/adminer/

#### Mailcatcher
http://wordpress.local/.seravo/mailcatcher/

#### Webgrind
http://wordpress.local/.seravo/webgrind/

#### Browsersync console
http://browsersync.wordpress.local
