---
layout: default
title: "WP-Palvelu Developer Docs"
---

### WP-Palvelu.fi Developer Guide

We have tried our best to deliver you pleasent time while developing your WordPress site in our platform.

All WP-Palvelu.fi instances are preconfigured for git development workflow. Sounds too much to handle? Don't worry you don't have use git or anything else included. Please develop your pages like you feel is best for you!

All instances have sftp/ssh access and you can develop your site like you are used to. Continue reading if you want to enhance your workflow and start using modern dev tools.

### Short guide

```bash
# Clone your site to your computer
$ git clone ssh://$SSH_USER@$SITE.wp-palvelu.fi:[$SSH_PORT]/data/wordpress ~/Projects/$SITE

# Start developing your site with Vagrant
$ cd ~/Projects/$SITE
$ vagrant up
```

[Read more about getting started]({% post_url 2015-10-10-configure-ssh %})