---
layout: page
title: "Remote testing"
category: tests
date: 2018-01-10 23:15:00
order: 2
published: true
summary: "This page contains information about how to access the Vagrant box remotely."
---

## By default the local Vagrant is not easy to access by others

Out-of-the-box the settings in the Vagrant box are such, that it is not easy for anybody else than yourself to see the website that is running locally. The exact limits depend on what kind of network settings your development laptop has, and how Virtualbox machines running on it are exposed. This documentation cannot cover all of those situtions, but on the other hand it is not Seravo specific, so any generic Vagrant documentation on this topic can be useful for more information.

## Sharing the Vagrant box website via Avahi/Bonjour

The [Seravo Vagrant box has Avahi support](https://github.com/Seravo/wordpress/blob/master/config-sample.yml#L14-L15) out-of-the-box. If you want your laptop to advertise to the local network that there is a website visible, you can simply edit the `config.yml` in your project and set `avahi: true`. After restarting the Vagrant box it will register the site name to your operating system Avahi service, which will then be advertised on the local network.

Normally typing e.g. `https://wordpress.local` only works on your own laptop as it can lookup the IP address from the `/etc/hosts` file. With Avahi anybody in the same local network can type `https://wordpress.local` and access the site (assuming there are no additional firewalls or restrictions in place).

## Sharing the Vagrant box website via PageKite

In theory you could allow anybody in the world to access your development website running inside your Vagrant box by using some tunneling system like [PageKite](http://pagekite.net/) or [localtunnel](https://localtunnel.me/). We have not tested it and the setup depends on so many details regarding your laptop and other local settings, that we cannot provide generic instructions here. This kind of setups are however very rare. Most developers use the [shadow (staging) environments]({{ site.baseurl }}{% post_url 2016-05-11-shadows %}) instead when they want to publish their work on a server that can be accessed anywhere from the Internet.
