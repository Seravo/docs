---
layout: page
title: "Remote testing"
category: tests
order: 2
date: 2018-01-10 23:15:00
---

## By default the local Vagrant is not easy to access by others

With the default Vagrant box settings it is not easy for someone other than yourself to see the website that is running locally. The exact limitations depend on what kind of network settings your development laptop has and how the Virtualbox machines running on it are exposed. This documentation cannot cover all of those situations, but on the other hand the setup is not Seravo-specific, so any generic Vagrant documentation on this topic can be useful for more information.

## Sharing the Vagrant box website via Avahi/Bonjour

The [Seravo Vagrant box has Avahi support](https://github.com/Seravo/wordpress/blob/master/config-sample.yml#L14-L15) out-of-the-box. If you want to make your website available to your local network, you can simply edit the `config.yml` in your project and set `avahi: true`. After restarting the Vagrant box it will register the site name to the Avahi service running in your system, which will make it available to the the local network.

Normally typing e.g. `https://wordpress.local` only works on your own computer as it can look up the IP address from the `/etc/hosts` file. With Avahi anybody in the same local network can type `https://wordpress.local` and access the site (assuming there are no additional firewalls or restrictions in place).

## Sharing the Vagrant box website via PageKite

In theory you could also allow anybody in the world to access your development website running inside your Vagrant box by using a tunneling system like [PageKite](http://pagekite.net/) or [localtunnel](https://localtunnel.me/). We have not tested this setup and it involves so many details regarding your local settings that it is not possible for us to provide generic instructions here. These kind of setups are however very rare. Most developers use the [shadow (staging) environments]({{ site.baseurl }}{% post_url 2016-05-11-shadows %}) instead when they want to publish their work on a server that can be accessed anywhere from the Internet.
