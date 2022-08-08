---
layout: page
title: "Site configuration"
order: 4
---

> It is not recommended to change the configuration in `Vagrantfile`.
The file should only be used to toggle the beta version of the Vagrant box.

The `config.yml` file in the project directory is used to set up the local development environment.
Seravo sites should come with one pre-configured. When you run the site for the first time with an
[empty project template](https://github.com/seravo/wordpress), the default `config.yml` file is generated from
the `config-sample.yml`.

## Default config.yml

```yaml
name: wordpress
development:
  domains:
    - wordpress.local
```

## Customized config.yml example

```yaml
name: wordpress

production:
  domain: example.seravo.com
  ssh_port: 12345

development:
  domains:
    - mywpsite.local
    - another.local
    - third.mywpsite.local

  pull_production_db: never
  pull_production_plugins: never
  pull_production_themes: never
```

## Customizing config.yml

The changes take effect after [stopping]({{ site.baseurl }}/local-development/workflows/#stop-a-machine) and
[restarting]({{ site.baseurl }}/local-development/workflows/#start-a-machine) the machine. Some changes may require
the [removal of the machine]({{ site.baseurl }}/local-development/workflows/#remove-a-machine) before restarting.

### Properties

#### **name**

Default: `wordpress`

Description: Change `name` in config.yml to change your site name. 
This is used in quite a few places in the development environment.
Commands like `wp-pull-staging-db` use this as the username for ssh connections.

Example:
```yaml
name: mywpsite
```

---
#### **production**

Default: -

Description: Add `domain` and `ssh_port` to sync with your production instance.

Example:
```yaml
production:
  domain: example.seravo.com
  ssh_port: 12345
```

---
#### **staging**

Default: -

Description: Add `domain` and `ssh_port` to sync with your staging (testing shadow) instance.

Example:
```yaml
staging:
  domain: example.seravo.com
  ssh_port: 23456
```

---
#### **development.domains**

Default: `wordpress.local`

Description: List of the local domains to create. Multisites should add all domains to the list.
These must not conflict with any other locally running site.

Example:
```yaml
development:
  domains:
    - mywpsite.local
    - another.local
    - third.mywpsite.local
```

---
#### **development.pull_production**

Default: -

Description: Whether to automatically pull from production on `vagrant up`. Set to
`always` or `never`.

Example:
```yaml
development:
  pull_production_db: always
  pull_production_plugins: always
  pull_production_themes: always
```
