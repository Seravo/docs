---
layout: page
title: "Vagrant box"
category: development
date: 2015-10-11 03:32:14
order: 1
summary: "This page contains information about Vagrant box used in Seravo local development."
---

## Develop locally with Vagrant

You can do development for your site locally in your own computer. This is done using Vagrant.

All of our sites are pre-configured with a Vagrantfile so you can just clone your site to your computer and start developing locally. We have mimicked the production environment as much as possible and bundled many development tools into the Vagrant image.

The virtual machine image is based on Ubuntu and it can be downloaded from [Hashicorp Atlas](https://vagrantcloud.com/seravo/boxes/wordpress).

## Contributing to the Vagrant image

Our project template can be found on Github: [Seravo/WordPress](https://github.com/Seravo/WordPress).

Please file an issue or make a pull request if you have suggestions how to make our Vagrant box and development environment even better.

## Requirements

* Knowledge of using terminal
* Vagrant **1.7.4 or later** installed
* Virtualbox **4.2 or later** installed

## Tested up to

* Vagrant 2.0
* Virtualbox 5.2

## Debugging Vagrant issues

Unfortunately Vagrant is somewhat brittle and many people experience issues with it from time to time. Here are some general tips on how to debug if Vagrant isn't working for you:

### If you experience slowness

Run `vagrant global-status` and check that you don't have too many Vagrant images running in parallel. You can also fire up the VirtualBox main window to get an overview what VirtualBox machines are active on your system.

Inside the Vagrant box you may also want to try turning of the [Xdebug profiler]({{ site.baseurl }}{% post_url 2015-10-11-xdebug %}) by running `wp-xdebug-off`. Xdebug can sometimes be quite heavy even when running in the background.

> **Note:** The Vagrant box will never be as fast as the live production site. This is intentional and helps WordPress site developers detect performance issues before they go into production. Both our Vagrant box and testing shadows have less available resources than the real production site, so that even a single user (the developer testing his/her code) might notice performance issues if the code has severe bugs. If the development environments are too powerful, badly performing code will go undetected into production.

### If you have startup issues

If during startup there are issues, you can simply try again a few times running `vagrant up`. If your Vagrant box is already running and you run `vagrant up` again it does no harm.

You can also see more verbose output during the startup if you run with `vagrant up --debug`.

### If you experience SSH connection errors

Try deleting the previous Vagrant box and try fresh again. It is fully OK, since the Vagrant boxes are intended to be throw-away development and testing boxes. All of your valuable data is stored in your project folder anyway. First the Vagrant box with `vagrant destroy`, then delete the all settings related to it `rm -rf .vagrant`. With `git status --ignored` you can see what else lies in your project directory and evaluate if you want to remove it as well or not. You should also check that the `/etc/hosts` file does not have any remnants pointing domain names to VirtualBox machines that no longer exists.

Once you are sure you have cleaned away all of the old box, then start fresh with `vagrant up`.

### Compare to vanilla version

To rule out if a problem is related to the Seravo Vagrant box in general, or just a particular instance, you can try firing up a vanilla instance and see if the error reproduces with it as well:

```
git clone https://github.com/Seravo/wordpress.git test
cd test
vagrant up
```

### Compate to another release

To make sure you have the latest version of our Vagrant box, please run `vagrant box update`. Hopefully any bugs we have had are fixed in the latest version. You can also test our next release in advance by replacing in the `Vagrantfile` the line `config.vm.box = 'seravo/wordpress'` with `config.vm.box = 'seravo/wordpress-beta'`.

### Compare to VVV

To rule out if a problem is related to the Vagrant in general, or just a the Seravo Vagrant box, you can try firing up a vanilla instance of [VVV](https://varyingvagrantvagrants.org/) and see if the error reproduces with it as well:
```
git clone https://github.com/Varying-Vagrant-Vagrants/VVV.git VVV
cd VVV
vagrant up
```

The VVV project also has some good [docs on typical Vagrant problems and how to troubleshoot](https://varyingvagrantvagrants.org/docs/en-US/troubleshooting/) them.
