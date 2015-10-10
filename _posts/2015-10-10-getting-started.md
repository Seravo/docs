---
layout: page
title: "Get started"
category: doc
date: 2015-10-10 20:15:25
---

### Obtaining your Credentials

After ordering your instance from [WP-Palvelu.fi](https://wp-palvelu.fi) you'll get email which consists your credentials:

    SSH/SFTP:
    Host: example-site.wp-palvelu.fi
    Port: 12345
    User: example-site
    Pass: 123456abcdefgh

**Note: Use your own credentials instead of these. These won't work!**
### Configuring SSH

We advice you to use ```.ssh/config``` file for easier ssh management. Add following lines to your config:

    Host example-site
      HostName example-site.wp-palvelu.fi
      User example-site
      Port 12345
      ForwardAgent yes

### Using SSH-key authentication
We advice you to use ssh key instead of password for accessing your site. [More about generating ssh keys](https://help.github.com/articles/generating-ssh-keys/)

```bash
# This will install your ssh-key into your WP-Palvelu instance.
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

# Now you have installed your ssh key into the server and can login to the site by:
$ ssh example-site
```

**Note for OS X users:** You need to install *ssh-copy-id* by ```$ brew install ssh-copy-id```

