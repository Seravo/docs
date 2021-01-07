---
date: 2015-10-12T18:05:02.000Z
layout: page
title: Deploy using Git
category: deployment
order: 1
---


## Requirements

1. You need to [setup your ssh settings]({{ site.baseurl }}{% post_url 2015-10-10-configure-ssh %}) first.
2. You need to a local git checkout of the site as described in [Local development]({{ site.baseurl }}{% post_url 2015-10-13-local-development %}).
3. You need to be in your project directory: `cd ~/Projects/your-site/`
4. You need to have `production` set as git remote:

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

**Note:** This doesn't deploy the database or the contents of uploads. We recommend that you don't include these in git.

```bash
$ git push production master

Counting objects: 8, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (8/8), done.
Writing objects: 100% (8/8), 667 bytes | 667.00 KiB/s, done.
Total 8 (delta 7), reused 0 (delta 0)
remote: Seravo: running post-receive git hook
remote: Seravo: SASS files changed, running Gulp...
remote: [21:07:07] Using gulpfile /data/wordpress/gulpfile.js
remote: [21:07:07] Starting 'default'...
remote: [21:07:07] Starting 'build'...
remote: [21:07:07] Starting 'sass'...
remote: [21:07:08] Finished 'sass' after 257 ms
remote: [21:07:08] Starting 'js'...
remote: [21:07:09] Finished 'js' after 1.16 s
remote: [21:07:09] Finished 'build' after 1.42 s
remote: [21:07:09] Finished 'default' after 1.42 s
remote: Found Tideways API key: abc123
remote: {"apiKey": "abc123", "name": "894405ac", "type": "release", "environment": "", "service": "web", "compareAfterMinutes":90}
remote: ==> Tideways event registered successfully!
remote: Seravo: Flushing all caches...
remote: ----> Purging WordPress object cache...
remote: Success: The cache was flushed.
remote: ----> Flush WordPress rewrites...
remote: Success: Rewrite rules flushed.
remote: ----> Flush the entire Redis cache (includes Nginx PageSpeed cache etc)...
remote: OK
remote: ----> Success
remote: ----> Purging Nginx page cache...
remote: Cache purged successfully for production.
remote: Error: Could not purge cache. Could be empty already.
To production:/data/wordpress
   124ebbc4..894405ac  master -> master
```

## Tutorial

If you have a working site in the Vagrant box and you want to deploy it

### Step 1 - Get SSH credentials

First you need to order a site from [seravo.com](https://seravo.com/) in order to get SSH credentials. Once you recieve the SSH credentials, you can configure SSH keys and such as are described in the [Configuring SSH]({{ site.baseurl }}{% post_url 2015-10-10-configure-ssh %}) section.

### Step 2 - Configure git remote 'production'

```bash
# Go to your project folder
$ cd Projects/your-site

# Add new remote to git
$ git remote add production ssh://your-site@your-site.seravo.com:12345/data/wordpress
```

> **Note:** This is just an example. Use the real credentials for your site.

### Step 3 - Push into 'production'

```bash
$ git push production master
```

If you have [git hooks]({{ site.baseurl }}{% post_url 2015-10-12-using-git-hooks %}) configured they will trigger automatically on the `git push`.

For deploying the database contents or the contents of the uploads folder you will need to roll your own solution which is safe enough to not overwrite any data created in production.

> **Note on wp-push- commands:**
> In Seravo Vagrant images created before [October 5th, 2016](https://github.com/Seravo/wp-vagrant/commit/792d6741bb734cea6fa739c7808f59eed05e991a), there used to be the commands `wp-push-production-db` (deploy database to production) and `wp-push-production-uploads` (deploy wp-content/uploads into production) but they were deemed as too risky and removed to protect customers from accidentally making too much damage to their site.
