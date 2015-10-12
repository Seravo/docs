---
layout: default
title: "WP-Palvelu Developer Docs"
---

### WP-Palvelu.fi Developer Guide

We have tried our best to deliver you pleasent time while developing your WordPress site in our platform.

All WP-Palvelu.fi instances are preconfigured for git development workflow. Sounds too much to handle? Don't worry you don't have use git or anything else included. Please develop your pages like you feel is best for you!

All instances have sftp/ssh access and you can develop your site like you are used to. Continue reading if you want to enhance your workflow and start using modern dev tools.

### Really minimal guide for developing your site:
Read the other topics to really understand what's happening over here.

```bash
# Clone your site to your computer
$ git clone ssh://$SSH_USER@$SITE.wp-palvelu.fi:[$SSH_PORT]/data/wordpress ~/Projects/$SITE --origin production

# Start developing your site with Vagrant
$ cd ~/Projects/$SITE
$ vagrant up

# Follow the vagrant installer
...

# Make changes to your site
...

# Save your work into git
$ git commit -am "Made some superb changes"

# See if commit triggered tests are succesful
...

# Push your changes to production
$ git push production master

```