---
layout: page
title: "Configure Vagrant Box"
category: development
date: 2015-10-12 19:12:17
order: 4
---

## Example configuration of config.yml

```yaml
###
# Configuration for Vagrant
###

# This is used as the hostname of the Vagrant box
name: wordpress

# These are used for migrating database and uploads back and forth with production
# Comment these out if you don't want this integration
production:
  domain: example.seravo.com
  ssh_port: 12345

staging:
  domain: example.seravo.com
  ssh_port: 23456

# Domains are automatically mapped to Vagrant with /etc/hosts modifications
development:
  domains:
    - wordpress.local
    - example.dev
    - www.example.dev

  # If you want other sin your local network (e.g. office) to be able to access
  # the site running on your laptop, activate Avahi / Bonjour / Zeroconf that
  # will advertise *.local domains on the network.
  avahi: true
```

### Customizing config.yml

#### name

Change `name` in config.yml to change your site name. This is used in quite a few places in the development environment.

For example, with the above config.yml [mailcatcher]({{ site.baseurl }}{% post_url 2015-10-11-mailcatcher %}) is set up in the address: mailcatcher.**example**.local.

#### production

Add `domain` and `ssh_port` to sync with your production instance.

#### staging

Optional: Add `domain` and `ssh_port` to sync with your staging (testing shadow) instance.

#### development

Add new domains under `domains` before you run `vagrant up` to use extra domains.

See [config-sample.yml](https://github.com/Seravo/wordpress/blob/master/config-sample.yml) for more.

#### Automatic operations on local development startup

The following items help automate typical steps in starting the development environment:

```
pull_production_db: always
pull_production_plugins: always
pull_production_themes: always
```

If you want to automatically pull stuff from production use `always` or set to `never` to just silence the yes/no question during `vagrant up` or `docker-compose run`.
