---
layout: page
title: "Debug mails with MailCatcher"
category: development
date: 2015-10-11 03:30:42
---

## MailCatcher
![mailcatcher in Vagrant]({{site.base_url}}/images/mailcatcher-example.png)

MailCatcher is web app which can be used to mimick real mail server. It's used in Vagrant to prevent WP from sending real mail. It just tells WordPress that mail was sended successfully and saves the contents for debugging.

You can use mailcatcher in address: **mailcatcher.{sitename}.local**

By default it is: **mailcatcher.wordpress.local**