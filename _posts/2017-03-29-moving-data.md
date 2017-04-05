---
layout: page
title: "Moving data between instances"
category: deployment
date: 2017-03-26 19:45:00
published: true
order: 3
summary: "Moving data between production, staging and other instances"
---

> **Warning:** Unlike some other publishing systems, in WordPress there is a lot of valuable content in the database (user accounts, comments, statistics) and among the files (mainly uploads). Bluntly pushing the database or files from staging to production will most likely destroy some valuable data, so please plan your deployments carefully.

## Pushing code is easy

Our WordPress project template (and many other similar ones, like Bedrock) have been designed with easy deployments in mind. It is preferred to use them so that your deployment to staging is a simple `git push staging` and after testing to production just `git push production`, all orchestrated from the lead developers laptop.

## Pushing a full site with database and files is risky

WordPress does not separate clearly between actual site contents, like the user or customer database, and layout related settings and other stuff in the database. Developers are sometimes tempted to push the entire database from staging to production, but be aware of the potential consequence. It is suitable only for a very static site.

However, if you are certain that it is safe to do, you can simply push files from the staging (or any other instance) to production via SSH. Alternatively you can pull files and the database from production fetching from any remote instance with SSH access.

Below are the steps how to do this from production, fetching data from stagning.

### Preparations before moving data from staging to production

The first step is to run `wp-backup` to make sure your current database and files are backed up in case there is an emergency and you need to revert. The latest database backup is found at `/data/backups/data/db/<sitename>.sql` and WordPress files at `/data/backups/data/wordpress/`.

The second step is to test your SSH credentials and connection. For that you need to know the SSH port number of your staging instance.

```
example@example_48daaa:/data/home/example$ ssh example@example.seravo.com -p 11111
The authenticity of host '[example.seravo.com]:11111' can't be established.
ECDSA key fingerprint is aa:aa:aa:aa:48:29:40:e7:a5:9f:ff:09:fc:aa:aa:aa.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '[example.seravo.com]:11111' (ECDSA) to the list of known hosts.
example@example.seravo.com's password:
example@example_37faaa:~$ exit
```

If you are familiar with SSH keys, you can generate them in the production environment and install them on the staging instance for easier access from production. In the name of a safe flow, don't automate staging initiated access towards production. The other way around is OK, as production in always persistent and trusted. Also feel free to use `.ssh/config` in the production instance.

### Copying files with rsync and SSH

The following commands demonstrate how to use rsync via SSH to fetch the new files as quickly as possible, because rsync only transfers the files and the parts of the files that are different. The flags stand for:

* `-av` saves file attributes (owner, time stamp) and prints out a verbose list of all files that changed
* `--delete-after` will delete all the files from production that did not exist in staging, in effect clearing obsolete files away
* `--exclude=wp-content/uploads` will omit the uploads directory from being transferred from staging, and from being deleted in production
*  in some cases you might want to have `exclude=.git` too
*  the other options define the staging instance's SSH port and hostname and path to the `wordpress/`` directory

```
rsync -av --delete-after --exclude=wp-content/uploads -e 'ssh -p 11320' example@example.seravo.com:/data/wordpress/ /data/wordpress
example@example.seravo.com's password:
receiving file list ... done
```

After the above we rsync the uploads folder, but with different options this time so that all fiels that previously existed in the production uploads folder will remain, and the files from staging will only be added upon them.

```
rsync -av -e 'ssh -p 11320' example@example.seravo.com:/data/wordpress/htdocs/wp-content/uploads /data/wordpress/htdocs/wp-content/uploads
```

### Importing the database with wp-cli and SSH

After all files have been transferred, the next step is to bring in the database from staging, if we really want the production to be 100% identical to what was in staging. Note that this will overwrite all data in the production database.

First we make a fresh database export in staging directly over SSH and import it in one command:

```
ssh example@example.seravo.com -p 11111 'wp db export -' | wp db import
```

Then you are done and can fire `wp-watch-logs` and browse the site to make sure everything looks good. If not, repeat the above or revert to backups.
