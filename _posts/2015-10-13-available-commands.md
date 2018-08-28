---
layout: page
title: "List of commands"
category: get-started
date: 2015-10-13 14:25:15
order: 5
summary: "Seravo.com contains a handful of additional commands for helping the admin and developer with basic tasks"
---

* TOC
{:toc}

<div class="command-list-content" markdown="1">
Vagrant box contains plenty of helpers for developing your site and migrating data to/from production.

Production contains most of these and also a command for purging cache.

### Admin helpers

#### wp-backup
``` wp-backup ``` - Dumps the wordpress database and backs up the ``` /data ``` directory into ``` /data/backups/data ``` using ``` rdiff-backup ```.

#### wp-backup-list-changes
``` wp-backup-list-changes ``` - Lists all files known by ``` rdiff-backup ``` sorted by timestamp. Use this to find out what files really changed in the system, as the file attribute mtime is not a reliable source of information. Use ```rdiff-backup --exclude /data/backups --compare-at-time now /data /data/backs/data/ ``` to find out how the current data differs from latest backup.

#### wp-backup-status
TODO::::

#### wp-fix-checksums
``` wp-fix-checksums ``` - Automates fixing typical situations where ``` wp core verify-checksums ``` returns an error. Does not attempt to fix any warnings returned.

#### wp-flush-cache
``` wp-flush-cache ``` - Wrapper for ``` wp-purge-cache ``` with flush cache terminology in line with what wp-cli uses. See ```wp-purge-cache```.

#### wp-list-files-mtime
``` wp-list-files-mtime ``` - Lists all recently changed filed based on mtime. Files modified during the last 30 days are listed. This is less reliable than ``` wp-backu-list-changes ``` as files can have their mtime attribute set to anything.

#### wp-optimize-images
``` wp-optimize-images ``` - Optimizes images on site. Can be given a path as a parameter, scans ```/data/wordpress/htdocs/wp-content/uploads/\``` as default. Runs only if the ```seravo-enable-optimize-images``` value in the database is set to true. Reduces the resolution of all JPEG files according to maximum width and height saved in the database table ``` wp_options ``` as ``` seravo-image-max-resolution-width ``` and ``` seravo-image-max-resolution-width ```. Maximum image quality for JPEG is set to 90. Image quality for PNG files is set to 7. Prints the output to terminal and ```/data/log/wp-optimize-images.log```.

#### wp-purge-cache
``` wp-purge-cache ``` - Purges nginx proxy cache, WordPress object cache, WordPress rewrite cache and PageSpeed cache.

#### wp-seravo-plugin-update
``` wp-seravo-plugin-update ``` - Update the must-use seravo-plugin to the latest version. It also cleans up all legacy remnants of the ``` wp-palvelu-plugin ```. Use ```--dev``` parameter to pull latest git master as update.



### Developer helpers
#### wp-list-env
```$ wp-list-env ``` - Prints a list of defined environment variables. Both the Vagrant image and the production server contain ENVs which define ports and credentials for WordPress. With this command you can debug the settings that you have.

#### wp-makepot
``` wp-makepot ``` - is a wrapper for ```Bphp /opt/wordpress/i18n/tools/makepot.php```. For more information on internationalization read the corresponding page on [WordPress Codex](https://codex.wordpress.org/I18n_for_WordPress_Developers).

#### wp-pomo-compile
``` wp-pomo-compile ``` - Find PO files, process each with ```msgfmt``` and rename the result to MO. Can be given a target path, otherwise the process is done on ```/data/wordpress/htdocs/wp-content/```.

#### wp-restart-nginx
```$ wp-restart-nginx``` - Gives the user the ability to restart nginx without root. Reloads any configuration at  ```/data/wordpress/nginx/*.conf```.

#### wp-restart-php
``` wp-restart-php ``` - Gives user an easy way to restart all versions of php-fpm.

#### wp-shadow-pull
``` wp-shadow-pull ``` - Replaces your files and information from your production environment with your chosen shadow environment. Use with caution, as it may break your site. Makes a backup for you automatically.

#### wp-shadow-reset
``` wp-shadow-reset ``` - Replaces your files and information from your shadow environment with your production environment. Use with caution, as data from your shadow can not be recovered after this process.

#### wp-speed-test
``` wp-speed-test ``` - Measure the load time of PHP resonses.

#### wp-test
``` wp-test ``` - Runs [Rspec tests]({{ site.baseurl }}{% post_url 2015-10-11-integration-tests %}) from ```/data/wordpress/tests/rspec/*.rb```.

#### wp-watch-logs
``` wp-watch-logs ``` - Start watching all the logs under ``` /data/log/ ```.



### Vagrant commands
> **Note:** These are only available inside the Vagrant box.

#### wp-ssh-production
``` wp-ssh-production``` - If your config.yml is set up with production details you can ssh into your production instance.

#### wp-pull-production-db
``` wp-pull-production-db``` - Copies the production database into your local Vagrant box. Also replaces all production siteurls in the database with your local development siteurl.

### Vagrant internal commands

(good to know, but not necessary to use as a developer)

<div class="bs-callout bs-callout-info">
  <strong>Note</strong>: These commands are used in <code>vagrantfile</code> by default.
</div>

#### wp-vagrant-activation
``` wp-vagrant-activation ``` - Restarts nginx and avahi-daemon, generates domains in /etc/hosts and production details to .ssh/config

#### wp-vagrant-dump-db
``` wp-vagrant-dump-db ``` - This is run everytime you `halt` or `destroy` the vagrant box. So that you have dump file next time.

#### wp-vagrant-import-db
``` wp-vagrant-import-db ``` - This is run everytime you `up` the vagrant box. It tries to import the dump file generated by ```wp-vagrant-dump-db``` so you can continue development where you left off.
</div>

