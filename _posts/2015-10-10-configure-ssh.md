---
layout: page
title: "Configure SSH"
category: get-started
date: 2015-10-10 22:20:23
order: 2
published: true
---

### Obtaining your Credentials

After ordering your instance from [WP-palvelu.fi](https://wp-palvelu.fi) you'll get email which include your credentials. It looks something like this:

    SSH/SFTP:
    Host: example-site.wp-palvelu.fi
    Port: 12345
    User: example-site
    Pass: 123456abcdefgh

**Note: Use your own credentials instead of these. These are just an example and won't work!**
### Configuring SSH

We advice you to use ```~/.ssh/config``` file for easier ssh management.

Add following lines to your config:

    Host example-site
      HostName example-site.wp-palvelu.fi
      User example-site
      Port 12345
      ForwardAgent yes

**ForwardAgent yes -** allows you to use your ssh credentials in the production machine to pull/push private code from/to Github/Bitbucket.

### Using SSH-key authentication
We advice you to use ssh key instead of password for accessing your site. [Read more about generating ssh keys](https://help.github.com/articles/generating-ssh-keys/). After the following step you have succesfully installed your ssh key into your WP instance.

**OS X users:** You need to install *ssh-copy-id* by ```$ brew install ssh-copy-id```

**Windows users:** Install your ssh key through **Putty** instead

```bash
# This will install your ssh-key into your WP-palvelu instance.
# Remember we set your credentials in the last step and the name of your site won't be example-site
$ ssh-copy-id example-site


 __    __   ___           ___      _           _           ___
/ / /\ \ \ / _ \         / _ \__ _| |_   _____| |_   _    /  _| _
\ \/  \/ // /_)/  ___   / /_)/ _` | \ \ / / _ \ | | | |   | |_ |_|
 \  /\  // ___/  |___| / ___/ (_| | |\ V /  __/ | |_| | _ |  _|| |
  \/  \//_/            \/    \__,_|_| \_/ \___|_|\__,_||_||_|  |_|


The authenticity of host '[example-site.wp-palvelu.fi]:12345 ([185.26.50.24]:12345)' cant be established.
RSA key fingerprint is xy:xy:xy:xy:xy:xy:xy:xy:xy:xy:xy:xy:xy:xy:xy:xy.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '[example-site.wp-palvelu.fi]:12345' (RSA) to the list of known hosts.
example-site@example-site.wp-palvelu.fi's password:

# After you enter your password you have installed your ssh key.
# After this setup you can login to your instance by:
$ ssh example-site
```
