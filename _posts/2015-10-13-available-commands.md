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
Vagrant box contains plenty of helpers for developing your site and migrating data to/from production. Production contains most of these and also a command for purging cache.

**For more information about any of the commands, please run `man <command>` or `command --help`.**

### Admin helpers

#### wp-backup
`wp-backup` - Dump the WordPress database and backup the `/data` directory into `/data/backups/data` using `rdiff-backup`.

#### wp-backup-list-changes
`wp-backup-list-changes` - List all files known by `rdiff-backup` sorted by date when backed up. Use this to find out what files really changed in the system, as the file attribute mtime is not a reliable source of information. Use `rdiff-backup --exclude /data/backups --compare-at-time now /data /data/backs/data/` to find out how the current data differs from latest backup.

#### wp-backup-status
`wp-backup-status` - List all backup increments known by `rdiff-backup` by date. Use this to find out what backups exists. This is an alias of `rdiff-backup --list-increment-sizes /data/backups/data`.

#### wp-fix-checksums
`wp-fix-checksums` - Automatically fix typical situations where `wp core verify-checksums` has detected an error (core files changed/tampered). Does not attempt to fix any warnings returned.

#### wp-flush-cache
`wp-flush-cache` - Wrapper for `wp-purge-cache` with flush cache terminology in line with what wp-cli uses. See `wp-purge-cache`.

#### wp-last-ssh-logins
`wp-last-ssh-logins` - List last logins according to system status history and failed logins based on wtmp and btmp logs.

#### wp-list-files-mtime
`wp-list-files-mtime` - List all recently changed filed based on modification time (mtime attribute). Files modified during the last 30 days are listed. This is less reliable than `wp-backup-list-changes` as files can have their mtime attribute set to anything.

#### wp-speed-test
`wp-speed-test` - Measure the load time of WordPress (PHP) page loads. Tests site front page by default, but other URLs can be given as an argument. Supports parameter `--cache` which will test how fast the sites load from front proxy (not PHP) if the tested URL supports HTTP level caching.

#### wp-load-test
`wp-load-test` - A simple command line tool to measure how many consecutive PHP requests the site can handle in a minute. Accepts same parameters as `wp-speed-test`.

#### wp-mail-test
`wp-mail-test` - A simple command line tool to test that that PHP `mail()` works as expected. Combine with mail-tester.com for most comprehensive results.

#### wp-optimize-images
`wp-optimize-images` - Optimize images on site. Can be given a path as a parameter but scans `/data/wordpress/htdocs/wp-content/uploads/\` but default. Runs only if the `seravo-enable-optimize-images` value in the database is set to true. Reduces the resolution of all JPEG files according to maximum width and height saved in the database table `wp_options`as`seravo-image-max-resolution-width`and`seravo-image-max-resolution-width`. Maximum image quality for JPEG is set to 90. Image quality for PNG files is set to 7. Prints the output to terminal and `/data/log/wp-optimize-images.log`.

#### wp-purge-cache
`wp-purge-cache` - Purge all server caches: Nginx proxy cache, WordPress object cache, WordPress rewrite cache and PageSpeed cache.

#### wp-reset-all-passwords
`wp-reset-all-passwords` - Reset passwords for all registered WordPress users. Automatically also resets sessions.

#### wp-reset-all-sessions
`wp-reset-all-sessions` - Reset sessions for all users, after which each user needs to login again.

#### wp-reset-ssh-password
`wp-reset-ssh-password` - Reset the SSH passwords. This is the only way to change the SSH password for a site at Seravo.

#### wp-seravo-plugin-update
`wp-seravo-plugin-update` - Update the must-use Seravo Plugin to the latest version. It also cleans up all legacy remnants of the `wp-palvelu-plugin`. Use `--dev` parameter to pull latest git master instead of the latest stable release.


### Developer helpers

#### wp-list-env
`wp-list-env` - Print a list of defined environment variables. Both the Vagrant image and the production server contain ENVs which define ports and credentials for WordPress. With this command you can debug the settings that you have.

#### wp-makepot
`wp-makepot` - is a wrapper for `php /opt/wordpress/i18n/tools/makepot.php`. For more information on internationalization read the corresponding page on [WordPress Codex](https://codex.wordpress.org/I18n_for_WordPress_Developers).

#### wp-pomo-compile
`wp-pomo-compile` - Find .po files, process each with `msgfmt` and generate binary .mo files. Can be given a target path as an argument, otherwise the process is done on `/data/wordpress/htdocs/wp-content/` and all subdirectories.

#### wp-restart-nginx
`wp-restart-nginx` - Restart Nginx. Does not require root permissions. Applies all configuration at `/data/wordpress/nginx/*.conf`.

#### wp-restart-php
`wp-restart-php` - Restart all PHP processes.

#### wp-shadow-pull
`wp-shadow-pull` - Replace files and database contents in your production environment with your chosen shadow environment. Use with caution, as it may break your site. Makes a backup for you automatically.

#### wp-shadow-reset
`wp-shadow-reset` - Replace files and database in a shadow environment with data from the production environment. Will delete and replace all files in the `/data/wordpress/` directory of a shadow with a clone from production. Use with caution, as data from your shadow can not be recovered after this process.

#### wp-test
`wp-test` - Run the [Codeception integration tests]({{ site.baseurl }}{% post_url 2018-09-21-ng-integration-tests %}).

#### wp-test-whitelist
`wp-test-whitelist` - Add an error or warning message to the [Codeception whitelist]({{ site.baseurl }}{% post_url 2018-09-21-ng-integration-tests %}).

#### wp-watch-logs
`wp-watch-logs` - Print all new linest written to any of the logs under `/data/log/`. Press Ctrl+C to exit.


### Database helpers

#### wp-db-optimize
`wp-db-optimize` - Run the CHECK and OPTIMIZE tasks for the WordPress database.

#### wp-db-cleanup
`wp-db-cleanup` - Remove older than current year post revisions from database. Use with caution, this is destructive operation. Operation is cancelable within 10 seconds by typing Ctrl+C.

#### wp-db-info
`wp-db-info` - Display database table size in bytes and wp_option record lenghts.

#### wp-db-dump
`wp-db-dump` - Dump current database into /data/db/. This file will normally be the daily backup database dump.

#### wp-db-load
`wp-db-load` - Replace current database with existing dump from /data/db/

#### wp-db-update
`wp-db-update` - Apply all pending wordpress database schema updates, if any

#### wp-db-admin
`wp-db-admin` - Access the MariaDB Proxy admin console


### Vagrant commands

> **Note:** These are only available inside the Vagrant box.

#### wp-xdebug-on/off
`wp-xdebug-on` and `wp-xdebug-off` - Activate and deactivates the [Xdebug profiler]({{ site.baseurl }}{% post_url 2015-10-11-xdebug %}). Run `wp-xdebug-off` if the Vagrant box seems sluggish to speed it up, as Xdebug can sometimes be quite heavy on the virtual machine load.

#### wp-ssh-production
`wp-ssh-production` - Log into production with SSH. Requires the config.yml to have the `production` section defined.

#### wp-pull-production-db
`wp-pull-production-db` - Copy the production database into local Vagrant box. Also replaces all production *siteurls* in the database with the local development *siteurl* based on the contents of `config.yml`.

#### wp-pull-production-plugins
`wp-pull-production-plugins` - Pull the plugins used in production. Uses `rsync` to make sure local `wp-content/plugins` is equal to the one in prodction.


### Vagrant internal commands

> **Note**: These commands are used by the `Vagrantfile`. These are not intended for manual invocation by any WordPress site developer.

#### wp-activate-git-hooks
`wp-activate-git-hooks` - Adds files to local `.git/hooks` for test automation on every local `git commit`. Read more about [git hooks]({{ site.baseurl }}{% post_url 2015-10-12-using-git-hooks %})

#### wp-generate-ssl
`wp-generate-ssl` - Generate SSL self-signed certificates for domains defined in `config.yml`.

#### wp-use-asset-proxy
`wp-use-asset-proxy` - Set an asset proxy for the development environment based on `config.yml`.

#### wp-vagrant-activation
`wp-vagrant-activation` - Restart Nginx and the Avahi daemon, and generates domains mappings in `/etc/hosts` and configure production details to `.ssh/config`.

#### wp-vagrant-dump-db
`wp-vagrant-dump-db` - This is run everytime you `halt` or `destroy` the Vagrant box so that the database can be re-imported on the next `vagrant up` run. Database dump is stored in the local `.vagrant` directory.

#### wp-vagrant-import-db
`wp-vagrant-import-db` - This is run everytime you `up` the Vagrant box. It tries to import the dump file generated by `wp-vagrant-dump-db` so you can continue development where you left off.

</div>
