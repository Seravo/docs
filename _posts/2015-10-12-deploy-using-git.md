---
date: 2015-10-12T18:05:02.000Z
layout: page
title: Deploy using Git
category: deployment
published: true
order: 1
---


## Requirements
1. You need to [setup your ssh settings]({{ site.baseurl }}{% post_url 2015-10-10-configure-ssh %}) first.
2. You need to have a git repository initialized on the server and a local copy of it as described in [Local development]({{ site.baseurl }}{% post_url 2015-10-13-local-development %}).
3. You need to be in your project directory: `cd ~/Projects/your-site/`
4. You need to have production set as git remote:

```bash
# Here we are using custom alias 'your-site' in ~/.ssh/config
$ git remote -v
production  your-site:/data/wordpress/.git (fetch)
production  your-site:/data/wordpress/.git (push)

# This is the output if project was cloned without ssh alias
$ git remote -v
production  ssh://your-site@your-site.seravo.com:12345/data/wordpress (fetch)
production  ssh://your-site@your-site.seravo.com:12345/data/wordpress (push)
```

## Deploy using git
**Note:** This doesn't deploy database or uploads. We recommend that you don't include these in git.

```bash
$ git push production master

Counting objects: 3, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 317 bytes | 0 bytes/s, done.
Total 3 (delta 2), reused 0 (delta 0)
remote: Seravo: composer.json was updated, installing...
remote: Loading composer repositories with package information
remote: Installing dependencies from lock file
remote: Nothing to install or update
remote: Generating autoload files
remote: > Wordpress/Installer::symlinkWPContent
remote: Seravo: Nginx configs were changed, reloading nginx...
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
First you need to order a site from [seravo.com](https://seravo.com/).

Afterwise you'll get ssh credentials, which are described in [Configuring SSH]({{ site.baseurl }}{% post_url 2015-10-10-configure-ssh %}) section.

#### Step 2 - Setting credentials

```bash
# Go to your project folder
$ cd Projects/your-site

# Add new remote to git
$ git remote add production ssh://your-site@your-site.seravo.com:12345/data/wordpress
```

> **Note:** This is just an example. Use the real credentials for your site.

#### Step 3 - Push into production

```bash
# First push doesn't share anything with the fresh site so you need to force push it
$ git push production master --force
```

For deploying the database contents or the uploads folder you need to roll your own solution which is safe enough to not overwrite any data created in production.

> **Note on wp-push- commands:**
> In Seravo Vagrant images created before [October 5th, 2016](https://github.com/Seravo/wp-palvelu-vagrant/commit/792d6741bb734cea6fa739c7808f59eed05e991a), there used to be the commands `wp-push-production-db` (deploy database to production) and `wp-push-production-uploads` (deploy wp-content/uploads into production) but they were deemed as too risky and removed to protect customers from accidentally making too much damage to their site.
