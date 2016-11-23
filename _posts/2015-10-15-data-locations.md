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
├── config.yml # See about Configuration above
├── composer.json # Use composer for package handling
├── composer.lock
├── gulpfile.js # Example for using gulp
├── Vagrantfile # Advanced vagrant environment and scripts packaged in Vagrantfile
│
├── tests # Here you can include tests for your wordpress instance
│   └── rspec
│       └── test.rb # Our default tests use rspec/poltergeist/phantomjs since we have found them very effective.
│
├── nginx # Here you can have your custom modifications to nginx which are also used in production
│   └── custom.conf # Default file with few examples to get started
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

## Git repository locations

It is intended that customers initialize a git repository in the `/data/wordpress` directory. For details see [Local development]({{ site.baseurl }}{% post_url 2015-10-13-local-development %}).
