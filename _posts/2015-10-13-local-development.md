---
date: 2015-10-13T14:26:53.000Z
layout: page
title: Typical workflow
category: development
order: 3
published: true
---

## Using git

Git is available in our platform, but there is no git repository by default. This is because most users want to create their own projects, and having a git repository initialized by default may create confusion. An even bigger source of confusion is a git repository with hundreds of untracked or modified by uncommitted files, a situation we want to avoid. From a server administration point of view the fact that there is a git repository somewhere is a signal that it was intentional and any uncommitted changes are real anomalies that need to be addressed.

### Start fresh repo from server contents

Log in to the server via SSH and initialize the project. You can use `git add .` to add all current files to the project as the default `.gitignore` file will omit everything that does not belong to be tracked by version control.

Example:

```bash
ssh my-site.seravo.com -p <port>
cd /data/wordpress/
git config --global user.name "<Full Name>"
git config --global user.email <email>
git init
git add .
git commit -am "Initial commit"
```

Now you can just clone the remote git repository to your machine and start working.

```bash
$ git clone ssh://$SSH_USER@$SITE.seravo.com:[$SSH_PORT]/data/wordpress ~/Projects/$SITE --origin production
```

## Alternative: Start by using our project template on GitHub

The method above gives you a fresh new project with no prior history. You may however want to consider using [our template](https://github.com/Seravo/wordpress) as a starting point and have s shared history, which makes it easier to later merge updated versions of our project template to your project. To do that run

```bash
$ git clone https://github.com/Seravo/wordpress ~/Projects/$SITE
$ cd ~Projects/$SITE
$ git remote add production ssh://$SSH_USER@$SITE.seravo.com:[$SSH_PORT]/data/wordpress
$ git push -f production master
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

# You can pull the production database (not required on new sites required)
$ wp-pull-production-db
```

Now you can open in a browser http://wordpress.local/ and edit the files in you project and see the result immediately.


When you think your code is good, commit it and push to production with:

```bash
$ git push production master
```

The `.git/hooks/post-receive` will run on the receiving end and run Composer and Gulp if configured to do so.

## Include default site database contents in the git repository

To provide a seamless `vagrant up` experience for anybody who starts to develop the site using the git repository as their sole starting point, you should include in the repository file named `vagrant-base.sql` that contains a suitable minimal database with some example settings and contents.

You can easily create such a database dump file by running inside Vagrant the commands

```bash
cd /data/wordpress
wp db export vagrant-base.sql --path=/data/wordpress/htdocs/wordpress --skip-extended-insert --allow-root --single-transaction
```

## Customize the 'vagrant up' run

If Vagrant detects that a file named `vagrant-up-customizer.sh` is present, it will automatically be run every time `vagrant up` is invoked. (Feature available in Seravo/WordPress since [Jan 29th, 2017](https://github.com/Seravo/wordpress/commit/ae51719e146615e7fcbde6b69c8a1deeb386510e)).
