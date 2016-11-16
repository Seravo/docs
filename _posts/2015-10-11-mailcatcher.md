---
layout: page
title: "Debug mails with MailCatcher"
category: development
date: 2015-10-11 03:30:42
published: true
---

## MailCatcher
![mailcatcher in Vagrant]({{site.baseurl}}/images/mailcatcher-example.png)

MailCatcher is web app which can be used to mimic real mail server. It's used in Vagrant to prevent WP from sending mail out of the system to actual recipients. It just tells WordPress that mail was sended successfully and saves the contents for the developer to see.

You can find MailCatcher at the address: **mailcatcher.{sitename}.local**

By default it is: **mailcatcher.wordpress.local**
