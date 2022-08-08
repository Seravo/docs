---
layout: page
title: "Installing the requirements"
order: 2
---

* TOC
{:toc}

<div class="command-list-content" markdown="1">

# Requirements

### Hardware

* A processor with **VT-x** or **AMD-V** enabled 
* A minimum of 10GB of available hard disk space
* A minimum of 4GB of RAM

Keep in mind that the larger your site, the more system resources it will require.

### Software

See [installation](#installation) for instructions on installing the software requirements.

- **VirtualBox** 6.0 or later (6.1.x recommended)
- **Vagrant** 2.2.0 or later (2.2.1x recommended)

On Windows:
- **Cygwin** with **Git** and **OpenSSH** (latest recommended)

On macOS:
- **Git** (latest recommended)
- **OpenSSH** (latest recommended)
- **Homebrew** (latest recommended)
- **Xcode** (latest recommended)

On Linux:
- **Git** (latest recommended)
- **OpenSSH** (latest recommended)

---

# Installation

If something goes wrong at any point, consult the software documentation
specified and the [Vagrant troubleshooting]({{ site.baseurl }}/local-environment/troubleshooting/) guide.

## Windows

**1. Install Cygwin**

- Download and run the [Cygwin installer](https://www.cygwin.com/install.html).
- Use the package utility to find the **git** and **openssh** packages.
- Choose the most recent versions of the packages from the dropdown menu.

If you run into any problems during the installation,
see the [Cygwin website](https://www.cygwin.com/install.html).

**2. Install VirtualBox**

- Download the latest [VirtualBox installer](https://www.virtualbox.org/wiki/Downloads) for Windows hosts.
- During the guided installation, choose the default configuration.

If you run into any problems during the installation,
see the [VirtualBox troubleshooting](https://www.virtualbox.org/manual/ch12.html) guide.

**3. Install Vagrant**

- Under the Windows tab, download the [Vagrant installer](https://www.vagrantup.com/downloads).
- If necessary, restart the system after installation.

If you need to run multiple sites locally or are uncomfortable with Cygwin terminal,
you should also install graphical [Vagrant manager](https://www.vagrantmanager.com/downloads/).

If you run into any problems during the installation,
see the [Vagrant installation](https://www.vagrantup.com/docs/installation) guide.

**4. Verify the installation**

Verify the installation by running Cygwin **as an administrator** and proceeding to
[testing the installation](#testing-the-installation)

---

## MacOS

> **Note:** This documentation might not be up-to-date.

**1. Install Xcode**

- Open a terminal and type `xcode-select —install` to install Xcode.
- Run `xcode-select -p` to ensure the installation was successful.

```shell
$ xcode-select -p
/Library/Developer/CommandLineTools
```

**2. Install VirtualBox**

The most recent VirtualBox DMG file is available for download from the
[VirtualBox website](https://www.virtualbox.org/wiki/Downloads).

If you run into any problems during the installation,
see the [VirtualBox troubleshooting](https://www.virtualbox.org/manual/ch12.html) guide.

**3. Install Vagrant**

Run `brew install vagrant` to install Vagrant with Homebrew, but no Vagrant plugins should be installed this way.

If you run into any problems during the installation,
see the [Vagrant installation](https://www.vagrantup.com/docs/installation) guide.

---

## Linux (Generic)

**1. Install Git and OpenSSH**

These are most likely already installed. You can install them using the package manager in your distribution.

**2. Install VirtualBox**

Install VirtualBox and VirtualBox DKMS using your distribution's package manager.
If the distribution package is not available, is too old, or does not work,
go to the [VirtualBox website](https://www.virtualbox.org/wiki/Linux_Downloads)
and download the most recent version for your system.

If you run into any problems during the installation,
see the [VirtualBox troubleshooting](https://www.virtualbox.org/manual/ch12.html) guide.

**3. Install Vagrant**

If Vagrant is installed from the distribution repository, it is unlikely to function properly.
If possible, follow the instructions on the [Vagrant website](https://www.vagrantup.com/downloads).
Vagrant can be installed from the distribution repository as a last resort, but no Vagrant plugins 
should be installed this way.

If you run into any problems during the installation,
see the [Vagrant installation](https://www.vagrantup.com/docs/installation) guide.

---

# Testing the installation

Run the following commands. You should see a similar output if the installation was successful.

```shell
$ git --version
git version 2.37.1

$ ssh -V
OpenSSH_9.0p1, OpenSSL 1.1.1q

$ vagrant version
Installed Version: 2.2.19
Latest Version: 2.2.19
```

---

Download and run the latest Seravo WordPress project template to test the local development environment.
It will take some time the first time you run `vagrant up`. If prompted to install plugins,
enter **Y** to accept and then run the command again once the plugins are installed.

```shell
$ git clone https://github.com/seravo/wordpress && cd wordpress
Cloning into 'wordpress'...

$ vagrant up
...
```

Once the environment is up and running, navigate to [https://wordpress.local](https://wordpress.local) in your browser.
Finally, use `vagrant halt` and `vagrant destroy` to bring the test site to a halt and remove it.

If the `vagrant up` command appears to be stuck for an extended period of time or prints an error,
follow the [Vagrant troubleshooting]({{ site.baseurl }}/local-environment/troubleshooting/) guide.
