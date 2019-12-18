---
date: 2015-10-13T14:26:53.000Z
layout: page
title: Typical workflow
category: development
order: 3
---

## Using git

Git is available on our platform, but there is no git repository by default. This is because most users want to create their own projects, and having a git repository initialized by default might create confusion. An even bigger source of confusion would be a git repository with hundreds of untracked or modified by uncommitted files, a situation we want to avoid. From the server administration point of view the fact that there is a git repository somewhere is a signal that it is there intentionally and any uncommitted changes are real anomalies that need to be addressed.

### Start a fresh repo from the server contents

You can simply clone the remote git repository to your machine and start working. All new sites deployed at Seravo have git initialized by default, so one can directly run `git pull` and `git push` commands against it.

```bash
$ git clone ssh://$SSH_USER@$SITE.seravo.com:$SSH_PORT/data/wordpress ~/Projects/$SITE --origin production
$ cd $SITE
```

A fresh new WordPress site at Seravo has the git history from [our WordPress project template](https://github.com/Seravo/wordpress). This is a good starting point, as it is easier to later merge updated versions of our project template to your project.

### Alternative: Start by using your own project template
> **Note:** Do not do this if you have existing site in production. Pushing to production site will overwrite your current content, and might lead to data loss.

If you don't want to use the Seravo project template as a starting point for your repository, you can also use your own WordPress project template for a new site and simply force push it to the newly created site, so that the git history is overwritten with your own custom project template history and contents.

```bash
$ git clone https://github.com/<customer>/wordpress-project ~/Projects/$SITE
$ cd ~/Projects/$SITE
$ git remote add production ssh://$SSH_USER@$SITE.seravo.com:[$SSH_PORT]/data/wordpress
$ git push --force production master
```

### Tip: you can have multiple git remotes:
```bash
$ git remote add github git@github.com:ottok/example-site.git
$ git remote -v
github	git@github.com:ottok/example-site.git (fetch)
github	git@github.com:ottok/example-site.git (push)
production ssh://example@example.seravo.com:12345/data/wordpress (fetch)
production ssh://example@example.seravo.com:12345/data/wordpress (fetch)
upstream	https://github.com/Seravo/wordpress (fetch)
upstream	https://github.com/Seravo/wordpress (push)
```

## Start up your local copy

Once you have the project on your own machine, starting it using Vagrant is as easy as running `vagrant up`:

```bash
# Start vagrant and follow the questions from the installer
# It's safe to just push enter to all of them
$ vagrant up

# You can connect into vagrant
$ vagrant ssh

# You can pull the production database (not required on new sites)
$ wp-pull-production-db

# You can also pull the production plugins (not required on new sites)
$ wp-pull-production-plugins
```

Now you can open http://wordpress.local/ in a browser and edit the files in you project and see the result immediately.


When you think your code is good to go, commit it and push to production with:

```bash
$ git push production master
```

The `.git/hooks/post-receive` will run on the receiving end and run Composer and Gulp if configured to do so. Note that if you created the git repository yourself, there will be no post-receive hook until you have copied it from `/usr/share/seravo/git/hooks/post-receive`.

When you are done, you can shut down Vagrant with `halt`. If you completely want to destroy the virtual image (for example to save disk space) execute `destroy`. Note that even after `destroy` you will have files under .vagrant and all the Composer installed modules etc under your project. Use `git clean` to get rid of all traces of `vagrant up`.

```bash
$ vagrant halt
$ vagrant destroy
$ git clean -fdx && git reset --hard
```

## Include default site database contents in the git repository

To provide a seamless `vagrant up` experience for anybody who starts to develop the site using the git repository as their sole starting point, you should include a file named `vagrant-base.sql` in the repository that contains a suitable minimal database with some example settings and contents.

You can easily create such a database dump file by running inside Vagrant the commands

```bash
$ cd /data/wordpress
$ wp db export vagrant-base.sql --path=/data/wordpress/htdocs/wordpress --skip-extended-insert --allow-root --single-transaction
```

## Customize the 'vagrant up' run

If Vagrant detects that a file named `vagrant-up-customizer.sh` is present, it will automatically be run every time `vagrant up` is invoked.

## Removing git from the WordPress site

If you want, you can remove the whole git repository simply by running:

```bash
$ rm -rf /data/wordpress/.git
```

This is however not recommended. Using git for version control greatly improves the productivity of programmers, decreases the number of mistakes made, provides an audit log of code changes and helps to verify that the code on the site does not have any unwanted changes.

## Git helps track changes – also if made by Seravo

Seravo's WordPress upkeep includes 24/7 monitoring. If a site goes down, Seravo will check what is wrong and attempt to recover the site. Details depend on what was the root cause of the failure. While coding work is not included in our fixed monthly fees, in some cases Seravo's staff might still do some small code changes if that is urgently needed to restore the site back in operation. If Seravo makes such changes and the site is using git for version control, Seravo will commit the changes to git.
