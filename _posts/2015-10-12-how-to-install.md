---
layout: page
title: How to install Vagrant
category: development
date: 2015-10-13 14:26:53
order: 2
published: true
---


## Installation

### Linux (Debian)

To use virtualbox make sure you have ```vt-x``` enabled in your bios.

```bash
$ sudo apt-get install vagrant virtualbox virtualbox-dkms git
$ vagrant plugin install vagrant-hostsupdater vagrant-triggers vagrant-bindfs
```

> **Optional:** If you want to have PHP Composer locally installed run:
>
> ```bash
> $ sudo apt-add-repository -y ppa:duggan/composer
> $ sudo apt-get update
> $ sudo apt-get install php5-composer
> ```

#### Ubuntu 16.04 and later need ruby-dev

If you see this error message on Ubuntu 16.04 or later:

```
$ vagrant up
mkmf.rb can't find header files for ruby at /usr/lib/ruby/include/ruby.h
```

It means you need to install separatey the Ruby development files:

```
sudo apt-get install ruby-dev
```

#### Ubuntu 17.04 and later

VirtualBox sets up the `vboxnet0` virtual interface routing using the legacy `ifconfig` and `route`
commands, instead of the modern `ip` command. For networking to work properly, you need to run
`apt install net-tools`.

### Linux (Fedora)

Add RPMFusion repositories. See  [RpmFusion](http://rpmfusion.org/). Repository is
needed for Virtualbox.

Clone the WordPress Git repo and run following commands:

```bash
$ sudo yum update
$ sudo yum install vagrant
$ sudo yum install virtualbox
$ sudo gem update bundler
$ sudo yum install ruby-devel # Needed to build native ruby extensions
$ sudo gem install hittimes -v '1.2.2'
$ vagrant plugin install vagrant-hostsupdater vagrant-triggers vagrant-bindfs

# Needed to load the kernel module for virtualbox, you may want to load it automatically on boot...
$ sudo modprobe vboxdrv
$ vagrant up
```

### OS X

1. [Install Xcode](https://developer.apple.com/xcode/downloads/)
2. [Install Vagrant](http://docs.vagrantup.com/v2/installation/)
3. [Install Virtualbox](https://www.virtualbox.org/wiki/Downloads)

```bash
$ vagrant plugin install vagrant-hostsupdater vagrant-triggers
```

> **Optional:** [Vagrant Manager for OS X](http://vagrantmanager.com/) can help you manage multiple Vagrant boxes.

### Windows (Cygwin)

To use virtualbox make sure you have ```vt-x``` enabled in your bios.
You might need to disable ```hyper-v``` in order to use virtualbox.

1. [Install Vagrant](http://docs.vagrantup.com/v2/installation/)
2. [Install Virtualbox](https://www.virtualbox.org/wiki/Downloads)

```bash
$ vagrant plugin install vagrant-hostsupdater vagrant-triggers
```

> **Optional:** [Vagrant Manager for Windows](http://vagrantmanager.com/windows/) can help you manage multiple Vagrant boxes.
