---
date: 2015-10-12T18:05:02.000Z
layout: page
title: Deploy using Git
category: deployment
published: true
order: 1
---


## Requirements
1. You need to [setup your ssh settings]({% post_url 2015-10-10-configure-ssh %}) first.
2. You need to have a git repository initialized on the server and a local copy of it as described in [Local development]({% post_url 2015-10-13-local-development %}).
3. You need to be in your project directory: `cd ~/Projects/your-site/`
4. You need to have production set as git remote:

```bash
# Here we are using custom alias 'your-site' in ~/.ssh/config
$ git remote -v
production  your-site:/data/wordpress/.git (fetch)
production  your-site:/data/wordpress/.git (push)

# This is the output if project was cloned without ssh alias
$ git remote -v
production  ssh://your-site@your-site.wp-palvelu.fi:12345/data/wordpress (fetch)
production  ssh://your-site@your-site.wp-palvelu.fi:12345/data/wordpress (push)
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

## Tutorials
### If you have working site in Vagrant box and want to deploy it
#### Step 1 - Getting credentials
First you need to order a site from [wp-palvelu.fi](https://wp-palvelu.fi/).

Afterwise you'll get ssh credentials, which are described in [Configuring SSH]({% post_url 2015-10-10-configure-ssh %}) section.

#### Step 2 - Setting credentials

```bash
# Go to your project folder
$ cd Projects/your-site

# Add new remote to git
$ git remote add production ssh://your-site@your-site.wp-palvelu.fi:12345/data/wordpress
```

> **Note:** This is just an example. Use the real credentials for your site.

#### Step 3 - Deploying code, database and assets

```bash
# First push doesn't share anything with the fresh site so you need to force push it
$ git push production master --force

# Log in to vagrant to use our migration helpers
$ vagrant ssh

# Deploy database to production
$ wp-push-production-db

# Deploy wp-content/uploads into production
$ wp-push-production-uploads
```
