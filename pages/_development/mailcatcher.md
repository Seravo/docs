---
layout: page
title: "Debug mails with MailCatcher"
order: 9
---

## MailCatcher
![mailcatcher in Vagrant]({{site.baseurl}}/images/mailcatcher-example.png)

MailCatcher is a web app which can be used to mimic a real-life mail server. It's used in Vagrant to prevent WP from sending mail out of the development environment to actual recipients. It simply tells WordPress that mail was sent successfully and saves the contents for the developer to see.

> **Note:** MailCatcher only catches mails sent by WordPress and does prevent sending mails using an external mail service (e.g. MailChimp) or external SMTP server.

You can find MailCatcher at the address: **{sitename}.local/.seravo/mailcatcher**

By default it is: **http://wordpress.local/.seravo/mailcatcher/**
