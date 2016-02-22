---
layout: page
title: "Configure Vagrant Box"
category: development
date: 2015-10-12 19:12:17
order: 4
published: true
---

## Example configuration of config.yml

```yaml
###
# Configuration for Vagrant
###

# This is used for domain mapping
name: example

# These are used for migrating database and uploads back and forth with production
# Comment these out if you don't want this integration
production:
  domain: example.wp-palvelu.fi
  ssh_port: 12345

# Domains are automatically mapped to Vagrant with /etc/hosts modifications
development:
  domains:
    - custom.domain
```

### Changing config.yml
#### name

Change `name` in config.yml to change your site name. This is used in quite some places in development environment.

For example with the above config.yml [mailcatcher]({% post_url 2015-10-11-mailcatcher %}) is setupped in address: mailcatcher.**example**.local.

#### production
Add `domain` and `ssh_port` to sync with your production instance.

#### development
Add new domains under `domains` before first vagrant up to have extra domains.

See [config-sample.yml](https://github.com/Seravo/wordpress/blob/master/config-sample.yml) for more.

## Using dotenv

The `wp-config.php` uses by default [Dotenv](https://github.com/vlucas/phpdotenv) so you can create a file `.env` to override default environment variables.

Example:
```
$ cat .env.development
# Run 'ln -s .env.development .env' in project root to activate this
WP_TEST_URL=https://example.dev
DOMAIN_CURRENT_SITE=example.dev
NOBLOGREDIRECT=https://example.dev
COOKIE_DOMAIN=.example.dev

$ ll .env
lrwxrwxrwx 1 otto otto .env -> .env.development
```

You can have template files like `.env.development` tracked in version control, and then per location make a symbolic link from `.env` to the correct file. By default the `.env` file is in gitignore.
