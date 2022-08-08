---
layout: page
title: "Vagrant workflows"
order: 3
---

* TOC
{:toc}

<div class="command-list-content" markdown="1">

# Machine management

## Start a machine

If you haven't [updated the Vagrantfile](#update-vagrantfile) in a while, do so before starting the machine.

A project can only have one machine running at any given time. If you have other projects running,
[stop them all](#stop-all-machines) before starting a new one to avoid problems and save system resources. If you need
to have multiple projects at once, make sure the [config.yml]({{ site.baseurl }}/local-environment/configuration/) has
a unique name and domains.

Run `vagrant up` in the project directory to start the machine. On Windows, always run
Cygwin **as an administrator** before running `vagrant up`.

---
## Stop a machine

Run `vagrant halt` in the project directory to stop the machine. launch the VirtualBox GUI program and terminate
the virtual machine if it's still in the `running` state.

---
## Remove a machine

[Stop the machine](#stop-a-machine) from running before removing it.

Run `vagrant destroy --force` in the project directory to remove the machine. Then, launch the VirtualBox GUI program,
and delete the virtual machine if it's still listed.

Remove the `.vagrant` directory and [clean up the WordPress](#wordpress-cleanup) and [host entries](#remove-host-entries)
for a fresh start. [Update the Vagrantfile](#update-vagrantfile) if you had issues with the machine.

## SSH to a machine

Run `vagrant ssh` in the project directory after [starting the machine](#start-a-machine).

```shell
$ vagrant ssh
Connecting to development environment... (ssh -- )
...
```

---
# Project files

## Update Vagrantfile

Before touching the `Vagrantfile`, always [remove the machine](#remove-a-machine).

The most recent `Vagrantfile` is available on [GitHub](https://raw.githubusercontent.com/Seravo/wordpress/master/Vagrantfile).
Download and replace the file manually, or use `curl` if it's already installed.

```shell
$ curl -L raw.githubusercontent.com/Seravo/wordpress/master/Vagrantfile > new
...

$ mv new Vagrantfile
```

After making the changes, run `vagrant box update` and [remove the old boxes](#remove-old-boxes).

---
## Toggle beta version

Before touching the `Vagrantfile`, always [remove the machine](#remove-a-machine).
You should also ensure that you have [the most recent Vagrantfile](#update-vagrantfile).

Open `Vagrantfile` with a text editor. Look for a line with `config.vm.box`.

To **enable beta version**, change the line to `config.vm.box = 'seravo/wordpress-beta'`.

To **disable beta version**, change the line to `config.vm.box = 'seravo/wordpress'`.

After making the changes, run `vagrant box update` and [remove the old boxes](#remove-old-boxes).

---
## WordPress cleanup

If WordPress fails to install, or you receive PHP errors,
try deleting the `vendor` directory and `composer.lock` file.

```shell
$ rm -rf vendor composer.lock
```

When you [start the machine](#start-a-machine), the files will regenerate.

---
# Vagrant cleanup

## Stop all machines

Get a list of all available machines.

```shell
$ vagrant global-status
id       name          provider   state   directory                           
------------------------------------------------------------------------------
a4a9e26  wordpress-box virtualbox running /home/user/my-wp-site1       
d12fa1b  wordpress-box virtualbox running /home/user/my-wp-site2
```

Stop all machines using the id in the first column.

```shell
$ vagrant halt a4a9e26
...

$ vagrant halt d12fa1b
...
```

If a machine cannot be stopped, it may not exist at all.
Running `vagrant global-status —prune` will clear the global machine cache.

Finally, launch the VirtualBox GUI program and terminate any virtual machines that were left running.

---
## Remove all machines

Before removing any machines, [stop them all](#stop-all-machines).
Then, using the same id, remove them.

```shell
$ vagrant destroy --force a4a9e26
...

$ vagrant destroy --force d12fa1b
...
```

If a machine cannot be removed, it may not exist at all.
Running `vagrant global-status —prune` will clear the global machine cache.

Using the directory in the last column, delete all machine files in `.vagrant` directory.

```shell
$ rm -rf /home/user/my-wp-site1/.vagrant

$ rm -rf /home/user/my-wp-site2/.vagrant
```

Finally, launch the VirtualBox GUI program and delete any remaining virtual machines.

---
## Remove all plugins

Before removing any plugins, ensure that all machines have been [removed](#remove-all-machines).

Run the following to remove all plugins:
- `vagrant plugin expunge --force --global-only`
- `vagrant plugin expunge --force --local-only`

---
## Remove old boxes

Before removing any old boxes, ensure that all machines that may be running the old version are
[removed](#remove-all-machines).

Running `vagrant box prune` should result in only one `wordpress` and `wordpress-beta` version being listed.

```shell
$ vagrant box prune
The following boxes will be kept...
seravo/wordpress      (virtualbox, 20201205.0.0)
seravo/wordpress-beta (virtualbox, 20220404.0.0)
```

---
## Remove host entries

> This workflow is only applicable to Linux and macOS.

Make certain that [all machines have been removed](#remove-all-machines). Open `/etc/hosts` with a text editor.
Remove any lines that contain `wordpress.local` or the name of your website.

When you start the machines, the correct lines will regenerate.

# Information gathering

## Find VirtualBox version

Launch the VirtualBox GUI program and open `About VirtualBox` under the `Help` menu.
The version number should be in `x.x.xx` format (e.g. 6.1.34).

---
## Find Vagrant version

Run `vagrant version`.

```shell
$ vagrant version
Installed Version: 2.2.19
Latest Version: 2.2.19
```
