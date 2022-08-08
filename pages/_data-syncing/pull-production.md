---
layout: page
title: Pulling production
order: 1
---

## Using git

Git is available on our platform and all new sites deployed at Seravo have git initialized by default. Using git for version control greatly improves the productivity of programmers, decreases the number of mistakes made, provides an audit log of code changes and helps to verify that the code on the site does not have any unwanted changes.

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

The `.git/hooks/post-receive` will run on the receiving end and run Composer and Gulp if configured to do so. Note that if you created the git repository yourself, there will be no post-receive hook until you have installed it from `scripts/git-hooks/post-receive`.

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

## Configuring git push settings

By default Git does not accept pushes on a non-bare repository and emits this warning:

```
laptop$ git push production
Counting objects: 8, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (8/8), done.
Writing objects: 100% (8/8), 667 bytes | 667.00 KiB/s, done.
Total 8 (delta 7), reused 0 (delta 0)
remote: error: refusing to update checked out branch: refs/heads/master
remote: error: By default, updating the current branch in a non-bare repository
remote: is denied, because it will make the index and work tree inconsistent
remote: with what you pushed, and will require 'git reset --hard' to match
remote: the work tree to HEAD.
remote:
remote: You can set the 'receive.denyCurrentBranch' configuration variable
remote: to 'ignore' or 'warn' in the remote repository to allow pushing into
remote: its current branch; however, this is not recommended unless you
remote: arranged to update its work tree to match what you pushed in some
remote: other way.
remote:
remote: To squelch this message and still keep the default behaviour, set
remote: 'receive.denyCurrentBranch' configuration variable to 'refuse'.
To production:/data/wordpress
 ! [remote rejected]   master -> master (branch is currently checked out)
```

Git settings can be overridden to allow pushing with [receive.denyCurrentBranch updateInstead](https://git-scm.com/docs/git-config#Documentation/git-config.txt-receivedenyCurrentBranch). See also [longer explanation on Stackoverflow](https://stackoverflow.com/a/28262104/1151722).

```
laptop$ ssh production
production$ cd /data/wordpress
production:/data/wordpress$ git config receive.denyCurrentBranch updateInstead
```

## Removing git from the WordPress site

If you want, you can remove the whole git repository simply by running:

```bash
$ rm -rf /data/wordpress/.git
```

This is however not recommended. Using git for version control greatly improves the productivity of programmers, decreases the number of mistakes made, provides an audit log of code changes and helps to verify that the code on the site does not have any unwanted changes.

## Git helps track changes – also if made by Seravo

Seravo's WordPress upkeep includes 24/7 monitoring. If a site goes down, Seravo will check what is wrong and attempt to recover the site. Details depend on what was the root cause of the failure. While coding work is not included in our fixed monthly fees, in some cases Seravo's staff might still do some small code changes if that is urgently needed to restore the site back in operation. If Seravo makes such changes and the site is using git for version control, Seravo will commit the changes to git.
