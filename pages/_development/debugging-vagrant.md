---
layout: page
title: "Debugging Vagrant"
order: 3
---

> **Note:** This is a guide on debugging and fixing issues with Seravo Vagrant box itself. For instructions on debugging a WordPress site, see **TODO XDEBUG**.

Although the Seravo Vagrant box is being actively developed, not all issues have been resolved. If you encounter
a bug or are unable to run the local site, follow these steps to resolve it.

1. Check to see if the [common issues]({{ site.baseurl }}/development/debugging-vagrant/#common-issues) has the solution you're looking for.
2. Check that your system is up-to-date, and that you have the most recent [Vagrant and VirtualBox versions]({{ site.baseurl }}/development/local-environment/#installing-the-requirements).
3. Replace the old Vagrantfile with the [most recent one](https://raw.githubusercontent.com/Seravo/wordpress/master/Vagrantfile) in the project directory.
4. Validate the properties and formatting and of your [configuration file]({{ site.baseurl }}/development/vagrant-essentials/#site-configuration).
5. Perform a [global cleanup]({{ site.baseurl }}/development/vagrant-essentials/#perform-a-global-cleanup) and [update the Vagrant box]({{ site.baseurl }}/development/vagrant-essentials/#update-the-vagrant-box).
6. Test using clean [Seravo/WordPress]({{ site.baseurl }}/development/local-environment/#testing-the-environment) project template.

If the problem persists, please [notify us]({{ site.baseurl }}/development/debugging-vagrant/#reporting-issues).
You can also experiment with [advanced debugging]({{ site.baseurl }}/development/debugging-vagrant/#advanced-debugging) techniques.

## Reporting issues

Please try the steps above before reporting an issue. If they were unable to assist you, you can file a bug report at
[https://github.com/Seravo/wordpress/issues](https://github.com/Seravo/wordpress/issues). Check to see if a similar
report already exists before creating a new one. As a Seravo customer, you can always contact
[Seravo customer service](https://seravo.com) directly. If you need to provide us with sensitive information,
this is the preferred method.

Please include the following information with your report to help us resolve the problem as soon as possible:
- If possible, the steps to reproduce the problem.
- What kind of operating system and CPU do you have?
- Versions of Vagrant (`vagrant -v`) and VirtualBox (`vboxmanage -v`).
- Output of `vagrant box list`, `vagrant status` and `vagrant up`.
- Contents of `Vagrantfile` and `config.yml` files.
- Vagrant PHP version (`vagrant ssh` then `php -v`).

## Common issues

### Linux

**Issue:** Error `mkmf.rb can't find header files for ruby` on `vagrant up`.

**Fix:** Install Ruby development files. On Ubuntu/Debian, run `sudo apt-get install ruby-dev`.

---

**Issue:** Networking doesn't work or networking related error on `vagrant up`.

**Fix:** Install `ifconfig` and `route` commands. On Ubuntu/Debian, run `sudo apt-get install net-tools`.

---

**Issue:** Host-only networking related error on `vagrant up`.

**Fix:** Reload VirtualBox with `sudo vboxreload`.

---

### MacOS

**Issue:** Any error on `vagrant up` with M1 CPU.

**Fix:** VirtualBox doesn't work with M1 CPUs. A fix will be provided in the future.

---

**Issue:** Error `failed to open /dev/vboxnetctl` on `vagrant up`.

**Fix:** [Grant more permissions](https://developer.apple.com/library/archive/technotes/tn2459/_index.html) to
Virtualbox via MacOS X System Preferences > Security & Privacy > General and restart or reinstall Virtualbox.
Completely restart VirtualBox service with any of the following:
```shell
$ sudo /Library/Application\ Support/VirtualBox/LaunchDaemons/VirtualBoxStartup.sh restart
$ sudo /Library/StartupItems/VirtualBox/VirtualBox restart
$ sudo launchctl load /Library/LaunchDaemons/org.virtualbox.startup.plist
```

---

### Windows

**Issue:** Any errors related to administrative access or site domain doesn't work.

**Fix:** Run terminal as administrator and run `vagrant up` then.

---

**Issue:** A command found from this documentation doesn't exist or work on Powershell.

**Fix:** Try Cygwin instead of Powershell. During Cygwin install, select the `openssh` and `git` packages.

## Advanced debugging

TODO
