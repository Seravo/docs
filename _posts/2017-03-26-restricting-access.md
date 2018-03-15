---
layout: page
title: "Restricting access"
category: configuration
date: 2017-03-26 19:45:00
order: 3
summary: "Restrict access to the site in various ways"
---

## Restricting access with built-in features of WordPress

WordPress offers a multitude of user management and access control related features. We warmly recommend you use them as your primary means of access management. You can easily protect individual pages and posts with a password by setting post visibility in WP admin to 'Password Protected'. You can activate [Maintenance Mode](https://wordpress.org/plugins/maintenance/) and allow only selected users to access the entire site.

For more complex scenarios you can install BuddyPress or use some of the groups plugins.

**Fiddling with Nginx based access control methods should be your last resort.** Using WordPress features and PHP code is always the more flexible, more user and developer friendly and the preferred method for managing authentication and enforcing access controls.

## Restricting access with HTTP Basic Authentication

> **Note:** This applies only to static HTML pages. If you want to restrict access to certain WordPress pages or sections, use a WordPress plugin or PHP code to implement it.

The HTTP Authentication headers based system is quite old fashioned and not exactly the state-of-the art in cryptographic security. The list of usernames and passwords needs to be maintained manually using the `htpasswd` command line utility. First create a file with the `-c` option and then add more users as you need:

```
htpasswd -bc /data/wordpress/nginx/htpasswd-file-example username1 adminpassword
htpasswd -b /data/wordpress/nginx/htpasswd-file-example username2 userpassword
```

Once you have generated a htpasswd file you can activate it for a particular path by for example creating a file `/data/wordpress/nginx/htauth.conf` like this:

```
location ^~ /restricted-section/ {
  auth_basic "Arbitrary realm name";
  auth_basic_user_file /data/wordpress/nginx/htpasswd-file-example;
}
```

Remember to run `wp-restart-nginx` to make the new Nginx config file effective.

> **Warning:** Do not activate HTTP Authentication for the entire site. Otherwise you will render the `wp-test` test unusable, all automatic monitoring of your site will start to fail and Seravo's admins cannot access your site to check it and do upkeep anymore.

## Restricting access by IP address

If you have a section of your site that should be visible for example to visitors from a certain subnet, typically some sort of intranet or extranet page, you might want to use IP address based access controls. **Be warned however that it is really hard to get right.** Unlike domain names, IP addresses come and go, and you need to manually keep the IP lists up-to-date. IP addresses should not be used for very sensitive content, as no per-user audit trail whatsoever is formed using blanket IP access rules.

Sometimes your users need to access the page on-the-go, so you should also provide a password authenticated venue of access they can resort to. A site should never have a hard, non-by-passable IP restrictions.

```
location ^~ /restricted-section/ {
  allow 1.2.3.4;
  allow 5.6.7.8;
  deny all;
}
```

> **Warning:** Do not activate IP address based restrictions for the entire site. Otherwise you will render the `wp-test` test unusable, all automatic monitoring of your site will start to fail and Seravo's admins cannot access your site to check it and do upkeep anymore.

## Use two factor authentication and don't waste time on implementing IP based restrictions

Many people want IP based restrictions because they are afraid that their users have bad passwords or for other reasons they are afraid and want to increase the barrier for unauthorized access. Rather than IP based restrictions, look into WordPress plugins that implement two factor authentication (2FA). The primary plugin to research is the [Two Factor plugin](https://wordpress.org/plugins/two-factor/), a feature project for WordPress Core. It will most likely become a part of [WordPress itself in the future](https://make.wordpress.org/meta/2018/02/27/two-factor-authentication-on-wp-org/).
