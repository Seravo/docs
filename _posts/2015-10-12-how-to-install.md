---
layout: page
title: "How to install Vagrant"
category: development
date: 2015-10-12 19:16:16
order: 2
---
## Installation

### Linux (Debian)

To use virtualbox make sure you have ```vt-x``` enabled in your bios.

```
sudo apt-get install vagrant virtualbox virtualbox-dkms git
vagrant plugin install vagrant-hostsupdater vagrant-triggers vagrant-bindfs
```

If you want to have PHP Composer locally installed run:
```
sudo apt-add-repository -y ppa:duggan/composer
sudo apt-get update
sudo apt-get install php5-composer
```

### Linux (Fedora)

Add RPMFusion repositories. See  [RpmFusion](http://rpmfusion.org/). Repository is
needed for Virtualbox.

Clone the wordpress Git repo and run following commands:

```
sudo yum update
sudo yum install vagrant
sudo yum install virtualbox
sudo gem update bundler
sudo yum install ruby-devel #needed to build native ruby extensions
sudo gem install hittimes -v '1.2.2'
vagrant plugin install vagrant-hostsupdater vagrant-triggers vagrant-bindfs
sudo modprobe vboxdrv #Need to load the kernel module for virtualbox, you may want to load it automatically on boot...
vagrant up

```

### OS X

1. [Install Xcode](https://developer.apple.com/xcode/downloads/)
2. [Install Vagrant](http://docs.vagrantup.com/v2/installation/)
3. [Install Virtualbox](https://www.virtualbox.org/wiki/Downloads)

```bash
vagrant plugin install vagrant-hostsupdater vagrant-triggers
```

**Optional:** [Vagrant Manager](http://vagrantmanager.com/) can help you manage multiple Vagrant boxes.

### Windows (Cygwin)

To use virtualbox make sure you have ```vt-x``` enabled in your bios.
You might need to disable ```hyper-v``` in order to use virtualbox.

1. [Install Vagrant](http://docs.vagrantup.com/v2/installation/)
2. [Install Virtualbox](https://www.virtualbox.org/wiki/Downloads)

```bash
vagrant plugin install vagrant-hostsupdater vagrant-triggers
```


