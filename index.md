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

```
# Clone your site to your computer and name the git remote as 'production'
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

 __    __   ___           ___      _           _           ___
/ / /\ \ \ / _ \         / _ \__ _| |_   _____| |_   _    /  _| _
\ \/  \/ // /_)/  ___   / /_)/ _` | \ \ / / _ \ | | | |   | |_ |_|
 \  /\  // ___/  |___| / ___/ (_| | |\ V /  __/ | |_| | _ |  _|| |
  \/  \//_/            \/    \__,_|_| \_/ \___|_|\__,_||_||_|  |_|

Counting objects: 3, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 317 bytes | 0 bytes/s, done.
Total 3 (delta 2), reused 0 (delta 0)
remote: WP-Palvelu: composer.json was updated, installing...
remote: Loading composer repositories with package information
remote: Installing dependencies from lock file
remote: Nothing to install or update
remote: Generating autoload files
remote: > Wordpress\Installer::symlinkWPContent
remote: WP-Palvelu: Nginx configs were changed, reloading nginx...
remote: testing nginx configuration...
remote: nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
remote: nginx: configuration file /etc/nginx/nginx.conf test is successful
remote: restarting nginx...
remote: nginx restarted!
To ssh://example@example.wp-palvelu.fi:12345/data/wordpress/.git
   01b9b80..9b3d006  master -> master

```