---
layout: page
title: "Data locations"
category: get-started
date: 2015-10-12 11:29:39
order: 1
published: true
summary: "This page includes all default data paths for Seravo site. This includes paths to log files and htdocs."
---

## Base installation

Seravo uses [https://github.com/Seravo/wordpress](https://github.com/Seravo/wordpress) as base installation for all sites. If you have any problems with the template please add [issue to Github](https://github.com/Seravo/wordpress/issues).

## Data locations

All of your data is held under path: ```/data/```. During the updates of your site we will wipe away all unneccessary files and only preserve things in ```/data/``` directory. But don't worry because for example we have moved your home folder into ```/data/home/$USER/``` and made correct symlinks so you won't even notice it's elsewhere.

### Web root (htdocs)
Your content is served from: ```/data/wordpress/htdocs/```

### WordPress installation path

WordPress is installed in: ```/data/wordpress/htdocs/wordpress/```

### WP-content

WP-content is moved outside of wordpress directory into: ```/data/wordpress/htdocs/wp-content/```

### Log files

All logs are saved in: ```/data/log/```

## Project Structure

Seravo uses custom directory layout which is derived from [Bedrock](https://github.com/roots/bedrock). Bedrock is WordPress layout which uses composer for package management. It's not advised to modify WP core files so usually your application is only what's included in **wp-content** -directory. When we use version control is much better if we have separated it to a folder which is outside of core installation. This template also includes tests, composer.json, custom nginx rules and files for local development (Vagrantfile). Let's take a closer look at the Project directory:

```
/data/wordpress
├── config.yml # See about Configuration above
├── composer.json # Use composer for package handling
├── composer.lock
├── gulpfile.js # Example for using gulp
├── Vagrantfile # Advanced vagrant environment and scripts packaged in Vagrantfile
│
├── tests # Here you can include tests for your WordPress instance
│   └── rspec
│       └── baseline.rb # Our baseline tests use rspec/poltergeist/phantomjs since we have found them very effective.
│       └── anything.rb # Your own test suite files can be named anything *.rb.
|
├── nginx # Here you can have your custom modifications to nginx which are also used in production
│   └── examples.conf # Some examples to get started
│   └── anything.conf # Your own config files can be named anything *.conf.
│
├── scripts
│   ├── hooks # Git hooks for your project
│   │   ├── pre-commit # This is run after every commit
│   │   └──
│   │
│   ├── wordpress
│   │   └── Installer.php #Additional composer scripts
│   │
│   └── run-tests # Bash-script as an interface for your tests in Seravo Production and Dev environment
│
├── vendor # Composer packages go here
└── htdocs # This is the web root of your site
    ├── wp-content # wp-content is moved out of core
    │   ├── mu-plugins
    │   ├── plugins
    │   ├── themes
    │   └── languages
    ├── wp-config.php
    ├── index.php
    └── wordpress # WordPress Core installed by composer
        ├── wp-admin
        ├── index.php
        ├── wp-load.php
        └── ...
```

## Migrating from Bedrock

Plain Bedrock has the following directory structure:

```
/data/wordpress
├── config
|   ├── environments
|   │   ├── production.php
|   │   └── ...
|   └── application.php
├── vendor
├── web
|   ├── app
|   │   ├── mu-plugins
|   │   ├── plugins
|   │   ├── themes
|   │   └── uploads
|   ├── index.php
|   └── wp-config.php
├── composer.json
└── ...
```

For this to continue to work, you need to add the following symlinks:
```
ln -s web htdocs
ln -s app htdocs/wp-content


```

The server expects to find the web root in `/data/wordpress/htdocs` and under it `wp-contents` with the site's files and `wordpress` with the WordPress core files.

## Directory layout with Capistrano or other deploy tools

If you use some deploy tool that deploys multiple versions of the files on the server, and then activates one of them by repointing a symbolic link, you could use a directory layout like this:

```
/data/wordpress
├── current -> releases/20170323143417
├── htdocs -> releases/20170323143417/web
├── nginx
├── releases
│   ├── 20170322075317
│   ├── 20170322112722
│   └── 20170323143417
│      ├── config
│       │   ├── deploy
│       │   └── environments
│       ├── public -> web
│       ├── vendor
│       │   ├── composer
│       │   └── vlucas
│       └── web
│           ├── app
│           │   ├── languages -> /data/wordpress/shared/web/app/languages
│           │   ├── mu-plugins -> /data/wordpress/shared/web/app/mu-plugins
│           │   ├── plugins -> /data/wordpress/shared/web/app/plugins
│           │   ├── themes
│           │   └── uploads -> /data/wordpress/shared/web/app/uploads
│           ├── wordpress -> /data/wordpress/htdocs/wp
│           ├── wp -> /data/wordpress/shared/web/wp
│           └── wp-content -> /data/wordpress/htdocs/app
└── shared
    ├── config -> releases/20170323143417/config
    ├── vendor -> releases/20170323143417/vendor
    └── web
        ├── app
        │   ├── languages
        │   ├── mu-plugins
        │   ├── plugins
        │   └── uploads
        └── wp
            ├── wp-admin
            ├── wp-content
            └── wp-includes
```

## Git repository locations

It is intended that customers initialize a git repository in the `/data/wordpress` directory. For details see [Local development]({{ site.baseurl }}{% post_url 2015-10-13-local-development %}).

If we detect that a git repository exists while we do upkeep and edit any project files, we will commit the changes so that the changes would be less likely to be lost of overwritten then the customer later does a redeploy.
