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

Our Vagrant image can be found in Github: [Seravo/wp-vagrant](https://github.com/Seravo/wp-vagrant).

We try to include all widely used dev tools in the box so that developers can use all tools really easily.

Please make a pull request if you feel that something important is missing.

## Requirements

* Knowledge of using terminal
* Vagrant **1.7.4 or later** installed
* Virtualbox **4.2 or later** installed
