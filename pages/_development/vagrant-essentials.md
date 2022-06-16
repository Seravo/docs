---
layout: page
title: "Vagrant Essentials"
order: 2
---

## Default credentials

WordPress:
- **Username**: `vagrant`
  **Password**: `vagrant`

MariaDB (MySQL):
- **Username**: `root`
  **Password**: `root` (full access)
- **Username**: `vagrant`
  **Password**: `vagrant` (wordpress db)

## Common workflows

#### Open shell to site
```shell
$ vagrant ssh            # Option 1 - Connect with SSH.
$ vagrant winrm          # Option 2 - Connect with WinRM (Windows only).

$ vagrant ssh-config     # Option 3 - Print SSH config and use other tools.
$ vagrant winrm-config   # Option 4 - Print WinRM config and use other tools.
```

#### Restart the machine
```shell
$ vagrant halt           # Stop the machine.
$ vagrant up             # Start the machine.
```

#### Destroy the machine
```shell
$ vagrant halt           # Stop the machine.
$ vagrant destroy        # Destroy the machine.
$ rm -rf .vagrant        # Remove the machine files.
```

#### Update the Vagrant box
```shell
$ vagrant box update     # Update the box.
$ vagrant box prune      # Remove old boxes.
$ ...                    # Destroy the old machine (instructions above).
$ vagrant status         # Verify that the status is "not created".
$ vagrant up             # Start the updated environment.
```

#### Perform a global cleanup
```shell
$ TODO
```

## Site configuration

The `config.yml` file in the project root directory is used to configure your Vagrant site. Changes to this
file requires [restarting the environment]({{ site.baseurl }}/development/vagrant-essentials/#restart-the-machine) to
take effect. If the file does not exist, copy the `config-sample.yml` file, download the
[most recent sample](https://raw.githubusercontent.com/Seravo/wordpress/master/config-sample.yml),
or use the example below.

Example configuration file with all the available properties set:
```yaml
# Name of the site and the hostname of the Vagrant box.
name: wordpress

# These are used for migrating database and uploads back and forth with production.
# Comment these out if you don't want this integration.
production:
  domain: example.seravo.com
  ssh_port: 12345
staging:
  domain: example.seravo.com
  ssh_port: 23456

# Domains are automatically mapped to Vagrant with /etc/hosts modifications.
development:
  domains:
    - wordpress.local
    - example.dev
    - www.example.dev

  # If you want others in your local network (e.g. office) to be able to access
  # the site running on your laptop, activate Avahi / Bonjour / Zeroconf that
  # will advertise *.local domains on the network.
  avahi: true

# Set the following to 'always' or 'never' to automate startup operations.
pull_production_db: always
pull_production_plugins: always
pull_production_themes: always
```
