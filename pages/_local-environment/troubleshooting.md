---
layout: page
title: "Troubleshooting"
order: 6
---

## Debugging steps

1. Find the [VirtualBox]({{ site.baseurl }}/local-environment/workflows/#find-virtualbox-version) and
[Vagrant]({{ site.baseurl }}/local-environment/workflows/#find-vagrant-version) versions. Make sure
they are up-to-date and fit the [requirements]({{ site.baseurl }}/local-environment/vagrant-installation/#software).

2. Make sure you have installed Vagrant from the source specified in
[installation guide]({{ site.baseurl }}/local-environment/vagrant-installation). If you haven't, remove all Vagrant
related software and follow the guide.

4. Examine the [common issues](#common-issues) to see if you can find a match. Check the
[Seravo/wp-vagrant](https://github.com/Seravo/wp-vagrant/issues) and
[Seravo/wordpress](https://github.com/Seravo/wordpress/issues) GitHub repositories to see if the issue
has been already reported.

5. Complete a thorough Vagrant cleanup and test with an empty project.
- Remove all Vagrant [machines]({{ site.baseurl }}/local-environment/workflows/#remove-all-machines)
and [plugins]({{ site.baseurl }}/local-environment/workflows/#remove-all-plugins).
- Clone the up-to-date [template](https://github.com/Seravo/wordpress) with
`git clone https://github.com/Seravo/wordpress`.
- [Enable the beta box]({{ site.baseurl }}/local-environment/workflows/#toggle-beta-version), run `vagrant box update` and
[remove the old boxes]({{ site.baseurl }}/local-environment/workflows/#remove-old-boxes).
- Start the machine with `vagrant up`. If the problem persists, consider [reporting it](#reporting-an-issue).

## Reporting an issue

After you've completed the [debugging steps](#debugging-steps), you can either
[file a bug report](https://github.com/Seravo/wordpress/issues/new) or contact
[Seravo customer service](https://seravo.com/en/contact/). If you need to include sensitive information with
the report, the latter is recommended.

Include the following with your report to expedite the resolution of the problem:
- Operating system and version
- [Vagrant version]({{ site.baseurl }}/local-environment/workflows/#find-vagrant-version) and
[VirtualBox version]({{ site.baseurl }}/local-environment/workflows/#find-virtualbox-version)
- The output from `vagrant up` command.

## Common issues

### Windows: WordPress installation fails with symlink error

**Issue**:

Running `vagrant up` for the first time fails with an error `symlink(): protocol error` on Windows.

**Fix**:

Run Cygwin as an administrator when you are about to
[start a machine]({{ site.baseurl }}/local-development/workflows/#start-a-machine).


### MacOS: `/dev/vboxnetctl` error during `vagrant up`

**Issue**:

Running `vagrant up` fails with an error `failed to open /dev/vboxnetctl` on macOS.

**Fix**:

[Grant more permissions](https://developer.apple.com/library/archive/technotes/tn2459/_index.html) to
VirtualBox via _System Preferences > Security & Privacy > General_. Finally, restart the VirtualBox service:

```shell
sudo /Library/Application\ Support/VirtualBox/LaunchDaemons/VirtualBoxStartup.sh restart
sudo /Library/StartupItems/VirtualBox/VirtualBox restart
sudo launchctl load /Library/LaunchDaemons/org.virtualbox.startup.plist
```

---
### Linux: Errors related to creating host-only network adapters

**Issue**:

Running `vagrant up` fails with an error related to creating host-only network adapters on Linux.

**Fix**:

VirtualBox kernel modules might not be loaded. Run `sudo vboxreload` to reload the modules.

---
### Linux: Networking issues or virtual interface errors

**Issue**:

Running `vagrant up` fails with an interface-related error, or networking fails. Known to affect Ubuntu 17.04 and
later.

**Fix**:

Make sure `ifconfig` and `route` commands exist. On Ubuntu, install them with `sudo apt-get install net-tools`.

---
### Linux: Ruby header files error during `vagrant up`

**Issue**:

Running `vagrant up` fails with an error `mkmf.rb can't find header files`. Known to affect Ubuntu 16.04 and later.

**Fix**:

Install the Ruby development files. On Ubuntu, run `sudo apt-get install ruby-dev`.
