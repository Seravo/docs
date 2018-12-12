---
layout: page
title: How to install Vagrant
category: development
date: 2015-10-13 14:26:53
order: 2
---

> **Vagrant 2.1.0 changes vagrant-triggers:** Currently our Seravo WordPress Vagrant box does not work with the latest version of Vagrant due to [non-backwards compatible changes in vagrant-triggers](https://github.com/Seravo/wp-palvelu-vagrant/issues/49). The work-around is to [install Vagrant 2.0.4](https://releases.hashicorp.com/vagrant/2.0.4/) instead of the latest version for now.

## Installation

### Linux (Ubuntu/Debian)

To use Virtualbox make sure you have ```vt-x``` enabled in your BIOS.

```bash
sudo apt-get install -y vagrant virtualbox virtualbox-dkms
git clone https://github.com/Seravo/wordpress ~/wordpress-dev
cd ~/wordpress-dev
vagrant plugin install vagrant-hostsupdater vagrant-triggers vagrant-bindfs
vagrant up
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

It means you need to install separately the Ruby development files:

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
sudo yum install vagrant virtualbox
sudo yum install ruby-devel # Needed to build native ruby extensions
sudo gem update bundler
sudo gem install hittimes -v '1.2.2'
vagrant plugin install vagrant-hostsupdater vagrant-triggers vagrant-bindfs

# Needed to load the kernel module for virtualbox, you may want to load it automatically on boot...
sudo modprobe vboxdrv
vagrant up
```

### Linux (General)

If you get errors related to creating host-only network adapters during vagrant up, run ```sudo vboxreload```.
It seems that sometimes the virtualbox kernel modules are not working correctly after the machine wakes up from sleep.

### MacOS X

1. [Install Xcode](https://developer.apple.com/xcode/downloads/): `xcode-select --install`
2. [Install Vagrant](http://docs.vagrantup.com/v2/installation/) (version 2.0.4, or any other release before 2.1.0!)
3. [Install Virtualbox](https://www.virtualbox.org/wiki/Downloads)
4. Clone this repo: `git clone https://github.com/Seravo/wordpress ~/wordpress-dev`
5. Run the installation in Terminal:
```
cd ~/wordpress-dev
vagrant plugin install vagrant-hostsupdater vagrant-triggers vagrant-bindfs
vagrant up
```
> **Optional:** [Vagrant Manager for OS X](http://vagrantmanager.com/) can help you manage multiple Vagrant boxes.

### Windows (Cygwin)

To use Virtualbox make sure you have ```vt-x``` enabled in your BIOS.
You might need to disable ```hyper-v``` in order to use Virtualbox.

1. [Install Cygwin](https://www.cygwin.com/) and via Cygwin `openssh` and `git`
2. [Install Vagrant](http://docs.vagrantup.com/v2/installation/) (version 2.0.4, or any other release before 2.1.0!)
3. [Install Virtualbox](https://www.virtualbox.org/wiki/Downloads)
4. Clone this repo: `git clone https://github.com/Seravo/wordpress ~/wordpress-dev`
5. Run the installation in terminal:
```
cd ~/wordpress-dev
vagrant plugin install vagrant-hostsupdater vagrant-triggers vagrant-bindfs
vagrant up
```
In theory, Seravo WordPress should work even without Cygwin installed, but we strongly recommend using Cygwin for doing WordPress development on Windows machines.

> **Optional:** [Vagrant Manager for Windows](http://vagrantmanager.com/windows/) can help you manage multiple Vagrant boxes.
