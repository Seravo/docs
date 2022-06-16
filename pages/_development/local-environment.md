---
layout: page
title: "Local Environment"
order: 1
summary: "This page contains information about Vagrant box used in Seravo local development."
---

## Develop locally with Vagrant

You can develop your site locally on your computer. The easiest way to do this is to use our Vagrant environment.
[Seravo Vagrant box](https://vagrantcloud.com/seravo/boxes/wordpress) mimics our production environment,
so you can avoid any hassle on [production deployment]({{ site.baseurl }}/deployment/deploy-using-git).
In addition to all necessary software, the environment is bundled with tools to help you with development, debugging,
testing and profiling.

The environment consists of a Docker container running inside a VirtualBox virtual machine. The virtual machine
makes it simple to set up, update and destroy an identical and isolated environment on any VirtualBox capable computer. 
Vagrant manages both the container and the virtual machine, so you don't have to deal with any of them directly. 

## Installing the requirements

The necessary software is listed in the table below. In addition, virtualization (VT-X/AMD-V) must be enabled in BIOS
or UEFI for VirtualBox to work. See [Vagrant](https://www.vagrantup.com/downloads) and
[VirtualBox](https://www.virtualbox.org/wiki/Downloads) for downloads and installation instructions. 

|            | Required       | Recommended   | Tested up to |
|------------|----------------|---------------|--------------|
| Vagrant    | 2.2.0 or later | latest 2.2.1x | 2.2.19       |
| VirtualBox | 4.2 or later   | latest 6.1.x  | 6.1.32       |

Our development documentation assumes that you have access to and are familiar with `git` and a terminal emulator.
Neither is an absolute necessity for using the Seravo Vagrant box.

## Testing the environment

To ensure the installation is successful, download an empty [Seravo/WordPress](https://github.com/Seravo/WordPress) project template:

```shell
$ git clone https://github.com/Seravo/wordpress ~/wordpress-dev
$ cd ~/wordpress-dev
```

The first startup will take some time and may require user interaction at various stages. See
[debugging instructions]({{ site.baseurl }}/development/debugging-vagrant) if the startup appears to be stuck, repeats
the same step for an extended period of time, exits with an error, or does not end with the site being accessible at
[https://wordpress.local](https://wordpress.local). Otherwise, proceed to
[Vagrant essentials]({{ site.baseurl }}/development/vagrant-essentials) and
[typical workflow]({{ site.baseurl }}/development/typical-workflow) instructions.
