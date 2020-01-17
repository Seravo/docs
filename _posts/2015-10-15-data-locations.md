---
layout: page
title: "Data locations"
category: get-started
date: 2015-10-12 11:29:39
order: 1
summary: "This page includes all default data paths for Seravo sites. This includes paths to log files and htdocs."
---

## Base installation

Seravo uses [https://github.com/Seravo/wordpress](https://github.com/Seravo/wordpress) as a base installation for all sites. If you have any problems with the template please submit an [issue to Github](https://github.com/Seravo/wordpress/issues).

## Data locations

All of your data is located under the path ```/data/```. During the updates of your site we will wipe away all unnecessary files and only preserve things in the ```/data/``` directory. No need to worry though, because we have moved your home folder into ```/data/home/$USER/```, for instance, and made correct symlinks so you won't even notice it's located somewhere else.

### Web root (htdocs)
Your content is served from:```/data/wordpress/htdocs/```

### WordPress installation path

WordPress is installed in: ```/data/wordpress/htdocs/wordpress/```

### WP-content

WP-content is moved outside of the wordpress directory into: ```/data/wordpress/htdocs/wp-content/```

### WordPress uploads

It is not recommended to store anything in `wp-content/uploads` in git. If you have images in your plugin or theme, store those files inside the plugin or theme directories. The `uploads` folder is intended only for user uploaded files (in production). The real production media files or database should not be tracked in git.

When a site is developed in our Seravo Vagrant box, the uploads will automatically be visible via our special uploads *asset proxy*. It will fetch any media file from the production site not present in the development environment on-the-fly. It requires the Vagrant box to have a working Internet connection and the production server address to be defined in the project `config.yml`. To use the production database while developing with the Seravo Vagrant box, see the command `wp-pull-production-db`.

### Log files

All logs are saved in: ```/data/log/```

## Project Structure

Seravo uses a custom directory layout which is derived from [Bedrock](https://github.com/roots/bedrock). Bedrock is a WordPress layout which uses Composer for package management. It is not advisable to modify any WP core files, so usually your application consists only of what's included in the **wp-content** -directory. When we use version control, it is much better to have your content separated to a folder which is separated from the core installation. Our custom template also includes tests, composer.json, custom Nginx rules and files for local development (Vagrantfile). Let's take a closer look at the Project directory:

```
/data/wordpress
├── config.yml # See about Configuration above
├── composer.json # Use composer for package handling
├── composer.lock
├── gulpfile.js # Example for using gulp
├── Vagrantfile # Advanced vagrant environment and scripts packaged in Vagrantfile
│
├── tests # Here you can include tests for your WordPress instance
│   └── codeception
│       └── acceptance
│           ├── console-whitelist.json # Your custom whitelists
│           └── MyTestCept.php         # Your custom tests
|
├── nginx # Here you can have your custom modifications to nginx which are also used in production
│   └── examples.conf # Some examples to get started
│   └── anything.conf # Your own config files can be named anything *.conf.
│
├── scripts
│   ├── git-hooks # Git hooks for your project
│   │   ├── post-receive # This is run in production/shadow when new commits are pushed to it
│   │   └── pre-commit # This is run after every commit
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

The server expects to find the web root in `/data/wordpress/htdocs` with `wp-contents` under it containing the site-specific files and `wordpress` containing the WordPress core files. Alternatively, you can simply modify your `composer.json` to use the same paths as defined in the [Seravo WordPress project template composer.json](https://github.com/Seravo/wordpress/blob/master/composer.json).

## Directory layout with Capistrano or other deploy tools

If you use a deploy tool that deploys multiple versions of the files on the server, and then activates one of them by repointing a symbolic link, you could use a directory layout like this:

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

It is intended that customers initialize a git repository in the `/data/wordpress` directory. For details, see [Local development]({{ site.baseurl }}{% post_url 2015-10-13-local-development %}).

If we detect that a git repository exists while doing upkeep and editing any project files, we will commit any changes so that it's less likely that the changes would be lost or overwritten when the customer later does a redeploy.
