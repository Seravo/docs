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
[`wp-backup`](/docs/man/wp-backup) - Dump the WordPress database and backup the `/data` directory into `/data/backups/data` using `rdiff-backup`.

#### wp-backup-list-changes
[`wp-backup-list-changes`](/docs/man/wp-backup-list-changes) - List all files known by `rdiff-backup` sorted by date when backed up. Use this to find out what files really changed in the system, as the file attribute mtime is not a reliable source of information. Use `rdiff-backup --exclude /data/backups --compare-at-time now /data /data/backs/data/` to find out how the current data differs from latest backup.

#### wp-backup-list-changes-since
[`wp-backup-list-changes-since`](/docs/man/wp-backup-list-changes-since) - List all files changed since given date.

#### wp-backup-status
[`wp-backup-status`](/docs/man/wp-backup-status) - List all backup increments known by `rdiff-backup` by date. Use this to find out what backups exists. This is an alias of `rdiff-backup --list-increment-sizes /data/backups/data`.

#### wp-fix-checksums
[`wp-fix-checksums`](/docs/man/wp-fix-checksums) - Automatically fix typical situations where `wp core verify-checksums` has detected an error (core files changed/tampered). Does not attempt to fix any warnings returned.

#### wp-fix-backups
[`wp-fix-backups`](/docs/man/wp-fix-backups) - Automatically fix typical problems in site backups.

#### wp-fix-languages
[`wp-fix-languages`](/docs/man/wp-fix-languages) - Automates fixing typical situations where language packs are missing or not installed.

#### wp-fix-project
[`wp-fix-project`](/docs/man/wp-fix-project) - Compares the current WordPress project at `/data/wordpress` to the upstream Seravo/WordPress project template and attempts to apply all upstream changes so that the project files at `/data/wordpress` would be as up-to-date as possible.

#### wp-fix-wp-content-symlink
[`wp-fix-wp-content-symlink`](/docs/man/wp-fix-wp-content-symlink) - Fixes a typical problem where the symlink from `wordpress/wp-content` to the correct WordPress wp-content is lost or broken.

#### wp-flush-cache
[`wp-flush-cache`](/docs/man/wp-purge-cache) - Wrapper for `wp-purge-cache` with flush cache terminology in line with what wp-cli uses. See `wp-purge-cache`.

#### wp-last-ssh-logins
[`wp-last-ssh-logins`](/docs/man/wp-last-ssh-logins) - List last logins according to system status history and failed logins based on wtmp and btmp logs.

#### wp-list-files-ctime
[`wp-list-files-ctime`](/docs/man/wp-list-files-ctime) - List all recently changed filed based on change time (ctime attribute). Files modified during the last 30 days are listed. This is less reliable than `wp-backup-list-changes` as files can have their ctime attribute set to anything.

#### wp-list-files-mtime
[`wp-list-files-mtime`](/docs/man/wp-list-files-mtime) - List all recently changed filed based on modification time (mtime attribute). Files modified during the last 30 days are listed. This is less reliable than `wp-backup-list-changes` as files can have their mtime attribute set to anything.

#### wp-php-compatibility-check
[`wp-php-compatibility-check`](/docs/man/wp-php-compatibility-check) - Check that the PHP code of the current WordPress installation, including themes and plugins, is compatible with the PHP specified. This is based on phpcs and its PHP compatibility rulesets.

#### wp-speed-test
[`wp-speed-test`](/docs/man/wp-speed-test) - Measure the load time of WordPress (PHP) page loads. Tests site front page by default, but other URLs can be given as an argument. Supports parameter `--cache` which will test how fast the sites load from front proxy (not PHP) if the tested URL supports HTTP level caching.

#### wp-load-test
[`wp-load-test`](/docs/man/wp-load-test) - A simple command line tool to measure how many consecutive PHP requests the site can handle in a minute. Accepts same parameters as `wp-speed-test`.

#### wp-mail-test
[`wp-mail-test`](/docs/man/wp-mail-test) - A simple command line tool to test that that PHP `mail()` works as expected. Combine with mail-tester.com for most comprehensive results.

#### wp-optimize-images
[`wp-optimize-images`](/docs/man/wp-optimize-images) - Optimize images on site. Can be given a path as a parameter but scans `/data/wordpress/htdocs/wp-content/uploads/\` but default. Runs only if the `seravo-enable-optimize-images` value in the database is set to true. Reduces the resolution of all JPEG files according to maximum width and height saved in the database table `wp_options`as`seravo-image-max-resolution-width`and`seravo-image-max-resolution-width`. Maximum image quality for JPEG is set to 90. Image quality for PNG files is set to 7. Prints the output to terminal and `/data/log/wp-optimize-images.log`.

#### wp-purge-cache
[`wp-purge-cache`](/docs/man/wp-purge-cache) - Purge all server caches: Nginx proxy cache, WordPress object cache, WordPress rewrite cache and PageSpeed cache.

#### wp-reset-all-passwords
[`wp-reset-all-passwords`](/docs/man/wp-reset-all-passwords) - Reset passwords for all registered WordPress users. Automatically also resets sessions.

#### wp-reset-all-sessions
[`wp-reset-all-sessions`](/docs/man/wp-reset-all-sessions) - Reset sessions for all users, after which each user needs to login again.

#### wp-reset-ssh-password
[`wp-reset-ssh-password`](/docs/man/wp-reset-ssh-password) - Reset the SSH passwords. This is the only way to change the SSH password for a site at Seravo.

#### wp-last-wp-logins
[`wp-last-wp-logins`](/docs/man/wp-last-wp-logins) - Shows a summary of successful WordPress logins and unsuccessful WordPress login attempts with relevant information fetched from `wp-login.log`.

#### wp-network-status
[`wp-network-status`](/docs/man/wp-network-status) - Show status of WordPress Network (multisite) installation. If the site this command is run on is not a WordPress Network, a notification is shown.

#### wp-check-haveibeenpwned
[`wp-check-haveibeenpwned`](/docs/man/wp-check-haveibeenpwned) - Use haveibeenpwned.com to check if the given password hash can be found in password leak databases.

#### wp-seravo-plugin-update
[`wp-seravo-plugin-update`](/docs/man/wp-seravo-plugin-update) - Update the must-use Seravo Plugin to the latest version. Use `--dev` parameter to pull latest git master instead of the latest stable release.

#### wp-check-http-cache
[`wp-check-http-cache`](/docs/man/wp-check-http-cache) - Check if HTTP cache is working on the site. Makes three requests and checks whether resources were loaded from cache.

#### wp-check-https
[`wp-check-https`](/docs/man/wp-check-https) - Check the status of site's HTTPS setup and create an in-depth report.

#### wp-check-passwords
[`wp-check-passwords`](/docs/man/wp-check-passwords) - Checks the strengths of WordPress user passwords. Shows a warning if a user has a weak password.

#### wp-check-php-version
[`wp-check-php-version`](/docs/man/wp-check-php-version) - Returns the PHP version.

#### wp-check-remote-failure
[`wp-check-remote-failure`](/docs/man/wp-check-remote-failure) - Test if WordPress continues to work without remote connections. Block connection to remote servers to test if WordPress continues to run as expected.

#### wp-theme-security-check
[`wp-theme-security-check`](/docs/man/wp-theme-security-check) - Check WordPress theme security with phpcs and log each run. Makes the check if a check has not been made before or if files have changed since the last check.


### Developer helpers

#### wp-list-env
[`wp-list-env`](/docs/man/wp-list-env) - Print a list of defined environment variables. Both the Vagrant image and the production server contain ENVs which define ports and credentials for WordPress. With this command you can debug the settings that you have.

#### wp-makepot
[`wp-makepot`](/docs/man/wp-makepot) - is a wrapper for `php /opt/wordpress/i18n/tools/makepot.php`. For more information on internationalization read the corresponding page on [WordPress Codex](https://codex.wordpress.org/I18n_for_WordPress_Developers).

#### wp-pomo-compile
[`wp-pomo-compile`](/docs/man/wp-pomo-compile) - Find .po files, process each with `msgfmt` and generate binary .mo files. Can be given a target path as an argument, otherwise the process is done on `/data/wordpress/htdocs/wp-content/` and all subdirectories.

#### wp-reload-nginx
[`wp-reload-nginx`](/docs/man/wp-reload-nginx) - Reload Nginx configuration. Does not require root permissions. Applies all configuration at `/data/wordpress/nginx/*.conf`. This command is sufficient when there are changes to Nginx configs. If you need to restart Nginx, see `wp-restart-nginx`.

#### wp-restart-nginx
[`wp-restart-nginx`](/docs/man/wp-restart-nginx) - Restart Nginx. Does not require root permissions. Applies all configuration at `/data/wordpress/nginx/*.conf`.

#### wp-restart-php
[`wp-restart-php`](/docs/man/wp-restart-php) - Restart all PHP processes.

#### wp-php-slowlog
[`wp-php-slowlog`](/docs/man/wp-php-slowlog) - Enable/disable logging for long-running PHP requests. When enabled, will log slow PHP runs for 3 hours.

#### wp-shadow-pull
[`wp-shadow-pull`](/docs/man/wp-shadow-pull) - Replace files and database contents in your production environment with your chosen shadow environment. Use with caution, as it may break your site. Makes a backup for you automatically.

#### wp-shadow-reset
[`wp-shadow-reset`](/docs/man/wp-shadow-reset) - Replace files and database in a shadow environment with data from the production environment. Will delete and replace all files in the `/data/wordpress/` directory of a shadow with a clone from production. Use with caution, as data from your shadow can not be recovered after this process.

#### wp-test
[`wp-test`](/docs/man/wp-test) - Run the [Codeception integration tests]({{ site.baseurl }}{% post_url 2018-09-21-ng-integration-tests %}).

#### wp-test-whitelist
[`wp-test-whitelist`](/docs/man/wp-test-whitelist) - Add an error or warning message to the [Codeception whitelist]({{ site.baseurl }}{% post_url 2018-09-21-ng-integration-tests %}).

#### wp-watch-logs
[`wp-watch-logs`](/docs/man/wp-watch-logs) - Print all new linest written to any of the logs under `/data/log/`. Press Ctrl+C to exit.

#### wp-git-status
[`wp-git-status`](/docs/man/wp-git-status) - Show a quick summary of state of the files in `/data/wordpress`, based on git status.


### Database helpers

#### wp-db-cli
[`wp-db-cli`](/docs/man/wp-db-cli) - Access the MariaDB console interface.

#### wp-db-optimize
[`wp-db-optimize`](/docs/man/wp-db-optimize) - Run the CHECK and OPTIMIZE tasks for the WordPress database.

#### wp-db-cleanup
[`wp-db-cleanup`](/docs/man/wp-db-cleanup) - Remove older than current year post revisions from database. Use with caution, this is destructive operation. Operation is cancelable within 10 seconds by typing Ctrl+C.

#### wp-db-info
[`wp-db-info`](/docs/man/wp-db-info) - Display database table size in bytes and wp_option record lenghts.

#### wp-db-size
[`wp-db-size`](/docs/man/wp-db-size) - Display database size by tables.

#### wp-db-dump
[`wp-db-dump`](/docs/man/wp-db-dump) - Dump current database into /data/db/. This file will normally be the daily backup database dump.

#### wp-db-load
[`wp-db-load`](/docs/man/wp-db-load) - Replace current database with existing dump from /data/db/

#### wp-db-update
[`wp-db-update`](/docs/man/wp-db-update) - Apply all pending wordpress database schema updates, if any

#### wp-db-admin
[`wp-db-admin`](/docs/man/wp-db-admin) - Access the MariaDB Proxy admin console

#### wp-restart-db
[`wp-restart-db`](/docs/man/wp-restart-db) - Restart connections to the database. Any connections that are taking too long or are stuck will be stopped during the restarting of database connections.


### Vagrant commands

> **Note:** These are only available inside the Vagrant box.

#### wp-xdebug-on/off
[`wp-xdebug-on`](/docs/man/wp-xdebug-on) and [`wp-xdebug-off`](/docs/man/wp-xdebug-off) - Activate and deactivates the [Xdebug profiler]({{ site.baseurl }}{% post_url 2015-10-11-xdebug %}). Run `wp-xdebug-off` if the Vagrant box seems sluggish to speed it up, as Xdebug can sometimes be quite heavy on the virtual machine load.

#### wp-ssh-production
[`wp-ssh-production`](/docs/man/wp-ssh-production) - Log into production with SSH. Requires the config.yml to have the `production` section defined.

#### wp-development-up
[`wp-development-up`](/docs/man/wp-development-up) - Start the Seravo development environment. Reads `config.yml` and attempts to load a copy of production database similarly to `wp-pull-production-db`.

#### wp-pull-production-core
[`wp-pull-production-core`](/docs/man/wp-pull-production-core) - Install the same WordPress core version into Local Vagrant box as on production site.

#### wp-pull-production-db
[`wp-pull-production-db`](/docs/man/wp-pull-production-db) - Copy the production database into local Vagrant box. Also replaces all production *siteurls* in the database with the local development *siteurl* based on the contents of `config.yml`.

#### wp-pull-shadow-db
[`wp-pull-shadow-db`](/docs/man/wp-pull-shadow-db) - Copy the database from a shadow (staging) environment into local Vagrant box. Also replaces all shadow *siteurls* in the database with the local development *siteurl* based on the contents of `config.yml`.

#### wp-pull-staging-db
[`wp-pull-staging-db`](/docs/man/wp-pull-staging-db) - Wrapper for `wp-pull-shadow-db` with staging terminology.

#### wp-pull-production-plugins
[`wp-pull-production-plugins`](/docs/man/wp-pull-production-plugins) - Pull the plugins used in production. Uses `rsync` to make sure local `wp-content/plugins` is equal to the one in prodction.

#### wp-pull-production-themes
[`wp-pull-production-themes`](/docs/man/wp-pull-production-themes) - Pull the themes used in production. Uses `rsync` to make sure local `wp-content/themes` is equal to the one in prodction.


### Vagrant internal commands

> **Note**: These commands are used by the `Vagrantfile`. These are not intended for manual invocation by any WordPress site developer.

#### wp-activate-git-hooks
[`wp-activate-git-hooks`](/docs/man/wp-activate-git-hooks) - Adds files to local `.git/hooks` for test automation on every local `git commit`. Read more about [git hooks]({{ site.baseurl }}{% post_url 2015-10-12-using-git-hooks %})

#### wp-generate-ssl
[`wp-generate-ssl`](/docs/man/wp-generate-ssl) - Generate SSL self-signed certificates for domains defined in `config.yml`.

#### wp-use-asset-proxy
[`wp-use-asset-proxy`](/docs/man/wp-use-asset-proxy) - Set an asset proxy for the development environment based on `config.yml`.

#### wp-vagrant-activation
[`wp-vagrant-activation`](/docs/man/wp-vagrant-activation) - Restart Nginx and the Avahi daemon, and generates domains mappings in `/etc/hosts` and configure production details to `.ssh/config`.

#### wp-vagrant-dump-db
[`wp-vagrant-dump-db`](/docs/man/wp-vagrant-dump-db) - This is run everytime you `halt` or `destroy` the Vagrant box so that the database can be re-imported on the next `vagrant up` run. Database dump is stored in the local `.vagrant` directory.

#### wp-vagrant-import-db
[`wp-vagrant-import-db`](/docs/man/wp-vagrant-import-db) - This is run everytime you `up` the Vagrant box. It tries to import the dump file generated by `wp-vagrant-dump-db` so you can continue development where you left off.

</div>
