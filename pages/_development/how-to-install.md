---
layout: page
title: How to install Vagrant
order: 2
---

> **Vagrant 2.1.0 changes vagrant-triggers:** If you are using Vagrant 2.0.4 or older, you need to also run `vagrant plugin install vagrant-triggers`. Users with Vagrant 2.1.0 or newer, and with the latest Vagrantfile from [Seravo/WordPress](https://github.com/Seravo/wordpress), don't need to install the legacy Vagrant triggers plugin anymore.

> **VirtualBox 6.1 compatiblity** requires Seravo/WordPress [version 20201205.0.0](https://app.vagrantup.com/seravo/boxes/wordpress/versions/20201205.0.0) and the latest Vagrantfile from the [Seravo/WordPress project template](https://github.com/Seravo/wordpress).

## Installation

### Linux (Ubuntu/Debian)

To use Virtualbox make sure you have `vt-x` enabled in your BIOS.

1. Clone this repo: `git clone https://github.com/Seravo/wordpress ~/wordpress-dev`
2. Run the installation in terminal:
```
cd ~/wordpress-dev
sudo apt-get install -y vagrant virtualbox virtualbox-dkms
vagrant plugin install vagrant-hostsupdater vagrant-bindfs
vagrant up
```

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

#### Ubuntu 18.04

The Vagrant version in Ubuntu 18.04 is rather old (Vagrant version 2.0.2) and the Vagrant plugin installations might fail due to that. If that happens, the only known way to resolve it is to simply install the latest Vagrant version directly from [Vagrantup.com](https://www.vagrantup.com/downloads.html).

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

If you get errors related to creating host-only network adapters during vagrant up, run `sudo vboxreload`.
It seems that sometimes the virtualbox kernel modules are not working correctly after the machine wakes up from sleep.

### MacOS X

1. [Install Xcode](https://developer.apple.com/xcode/downloads/): `xcode-select --install`
2. [Install Vagrant](https://www.vagrantup.com/docs/installation/)
3. [Install Virtualbox](https://www.virtualbox.org)
4. Clone this repo: `git clone https://github.com/Seravo/wordpress ~/wordpress-dev`
5. Run the installation in Terminal:
```
cd ~/wordpress-dev
vagrant plugin install vagrant-hostsupdater vagrant-bindfs
vagrant up
```

> **Note:** If `vagrant up` fails with an error including `failed to open /dev/vboxnetctl` you will need to [grant more permissions to Virtualbox](https://developer.apple.com/library/archive/technotes/tn2459/_index.html) via MacOS X System Preferences > Security & Privacy > General and restart or reinstall Virtualbox.

Variants on how to restart VirtualBox (not just the UI window, but the whole service):
```
sudo /Library/Application\ Support/VirtualBox/LaunchDaemons/VirtualBoxStartup.sh restart
sudo /Library/StartupItems/VirtualBox/VirtualBox restart
sudo launchctl load /Library/LaunchDaemons/org.virtualbox.startup.plist
```

> **Optional:** [Vagrant Manager for OS X](http://vagrantmanager.com/) can help you manage multiple Vagrant boxes.

### Windows (PowerShell – recommended)

To use Virtualbox make sure you have `vt-x` enabled in your BIOS. On Windows 10 you need to run Cygwin as an administrator so `vagrant-hostsupdater` can write the necessary entries to `/system32/drivers/etc/hosts`. Otherwise you need to add the vagrant-hostsupdater entries manually. Note that in some cases you can't modify the `hosts` file without administrative access. In that case you need to ask the administrator to give you access to the file.

On some versions of Windows (Windows 8) you might get a "Vt-x is not available" error. You'll need to disable Hyper-V in bios to proceed with the installation.
Most bios setups have the option under "Security".

Note that PowerShell needs to be run in administrator mode.

1. [Install Git](https://git-scm.com/downloads)
2. [Install Vagrant](https://www.vagrantup.com/docs/installation/)
3. [Install Virtualbox](https://www.virtualbox.org/)
4. Clone this repo with PowerShell: `git clone https://github.com/Seravo/wordpress wordpress-dev`
5. Run the installation in terminal:
```
cd wordpress-dev
vagrant plugin install vagrant-hostsupdater vagrant-bindfs
vagrant up
```

### Windows (Cygwin)

> **Note:** Cygwin doesn't include a package manager, so in order to install extra packages like `openssh` and `git`, you have to select them during the Cygwin setup. To add packages to an existing Cygwin installation, you can just re-run the setup binary (i.e. `setup-x86_64.exe`).

1. [Install Cygwin](https://www.cygwin.com/) and remember to select `openssh` and `git` during the Cygwin setup.
2. [Install Vagrant](https://www.vagrantup.com/docs/installation/)
3. [Install Virtualbox](https://www.virtualbox.org/)
4. Clone this repo: `git clone https://github.com/Seravo/wordpress ~/wordpress-dev`
5. Run the installation in terminal:
```
cd ~/wordpress-dev
vagrant plugin install vagrant-hostsupdater vagrant-bindfs
vagrant up
```

Cygwin will give you the following message and the necessary entries you need to add to the `hosts` file, if you try to vagrant up without administrative access.

Note that this is just an example. Your message will be different.
```
[vagrant-hostsupdater] Writing the following entries to (system32/drivers/etc/hosts)
[vagrant-hostsupdater] exampleIP-address examplehostname
[vagrant-hostsupdater] This operation requires administrative access.
You may skip it by manually adding equivalent entries to the hosts file.
```

> **Optional:** [Vagrant Manager for Windows](http://vagrantmanager.com/windows/) can help you manage multiple Vagrant boxes.
