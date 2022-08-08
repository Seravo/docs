---
layout: page
title: "Vagrant introduction"
order: 1
---

You can work on your website without affecting the production server.
[Seravo Vagrant box](https://vagrantcloud.com/seravo/boxes/wordpress) simulates the Seravo
WordPress production environment, saving you time and trouble during production deployment. In addition to all
required software, the environment includes tools to aid in development, debugging, testing, and profiling.

The environment is a containerized server running inside a virtual machine. The virtual machine makes
it simple to create an identical and isolated environment on any system that supports virtualization.
Vagrant manages both the container and the virtual machine, so you shouldn't have to worry about either of them.

All sites with Seravo are pre-configured with a `Vagrantfile` and a site specific config file.

## Getting started

To begin, install the environment by following the
[requirements installation]({{ site.baseurl }}/local-environment/vagrant-installation/) guide. See the
[common workflows]({{ site.baseurl }}/local-environment/workflows/) and
[configuration]({{ site.baseurl }}/local-environment/configuration/) after you've confirmed a functional installation
by running an empty test site. Learn the [tools](#credentials-and-urls) and
[commands]({{ site.baseurl }}/get-started/available-commands/#developer-helpers)
you'll need to optimize your development process.

If you encounter any problems, consult the [troubleshooting]({{ site.baseurl }}/local-environment/troubleshooting/) guide
for instructions on debugging and reporting the problem.

## Credentials and URLs

These default credentials and URLs might be different if you have cloned a production site.

### WordPress 

[http://wordpress.local/wp-admin](https://wordpress.local/wp-admin/)

**user**: vagrant **password**: vagrant

---
### Adminer

[http://wordpress.local/.seravo/adminer](https://wordpress.local/.seravo/adminer/)

[http://adminer.wordpress.local](https://adminer.wordpress.local/)

**user**: vagrant **password**: vagrant

---
### Mailcatcher

[http://wordpress.local/.seravo/mailcatcher](https://wordpress.local/.seravo/mailcatcher/)

[http://mailcatcher.wordpress.local](https://mailcatcher.wordpress.local/)

---
### Webgrind

[http://wordpress.local/.seravo/webgrind](https://wordpress.local/.seravo/webgrind/)

[http://webgrind.wordpress.local](https://webgrind.wordpress.local/)

---
### Browsersync console

[http://browsersync.wordpress.local](https://browsersync.wordpress.local/)

---
### MariaDB

**user**: root **password**: root

**user**: vagrant **password**: vagrant
