---
layout: page
title: "Updating Vagrant Box"
category: development
date: 2015-10-23 10:53:29
order: 4
summary: "New vagrant boxes are released a few times in a month. Before updating you need to destroy the currently active box and start a new one."
---

## When to update the Vagrant Box
When you're using Vagrant, it will automatically check for updates. If an update is available you'll get a message like this:

```bash
$ vagrant up
Bringing machine 'default' up with 'virtualbox' provider...
==> default: Checking if box 'seravo/wordpress' is up to date...
==> default: A newer version of the box 'seravo/wordpress' is available! You currently
==> default: have version '20151016.13.2529'. The latest is version '20151022.21.3040'. Run
==> default: `vagrant box update` to update.
...
```

This is an indicator that you don't have the newest version of the box available locally.

## Download new box image

Run the following command in your project folder so that you'll get new version of the box ```seravo/wordpress```:

```bash
$ vagrant box update
```

> **Note:** This might take a while. The image is  ~**900mb** large because it's designed to have everything included for easier usage.

## Replace the old box with a newer one

Run the following commands in your project folder:

```bash
# First make sure that the original box is online for the database dumps to work
$ vagrant up

# Then just destroy the box
# This triggers a database dump in the box which is used when a new box comes online.
$ vagrant destroy --force

# Then just start it again. This will use newer box image and use the earlier database and ssl certicates
$ vagrant up
```
