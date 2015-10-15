---
date: 2015-10-12T18:05:02.000Z
layout: page
title: Deploy using Git
category: deployment
published: true
order: 2
---


## Requirements
1. You need to [setup your ssh settings]({% post_url 2015-10-10-configure-ssh %}) first.
2. Your production needs to use git in `/data/wordpress/.git` so that we can push over there. (By default it is already there)
3. Go to your project directory: `$ cd ~/Projects/your-site/`
4. You need to have production set as git remote:

```bash
# Here we are using custom alias 'your-site' in ~/.ssh/config
$ git remote -v
production  your-site:/data/wordpress/.git (fetch)
production  your-site:/data/wordpress/.git (push)

# This is the output if project was cloned without ssh alias
$ git remote -v
production  ssh://your-site@your-site.wp-palvelu.fi:10290/data/wordpress (fetch)
production  ssh://your-site@your-site.wp-palvelu.fi:10290/data/wordpress (push)
```

## Deploy using git
**Note:** This doesn't deploy database or uploads. We recommend that you don't include these in git.

```bash
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
remote: WP-palvelu: composer.json was updated, installing...
remote: Loading composer repositories with package information
remote: Installing dependencies from lock file
remote: Nothing to install or update
remote: Generating autoload files
remote: > Wordpress/Installer::symlinkWPContent
remote: WP-palvelu: Nginx configs were changed, reloading nginx...
remote: testing nginx configuration...
remote: nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
remote: nginx: configuration file /etc/nginx/nginx.conf test is successful
remote: restarting nginx...
remote: nginx restarted!
To your-site:/data/wordpress/.git
   01b9b80..9b3d006  master -> master
```
