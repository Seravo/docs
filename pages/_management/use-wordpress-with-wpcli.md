---
layout: page
title: "Manage with wp-cli"
summary: "All Seravo sites come with wp-cli preinstalled and configured for easier command-line management."
---

## Basics
You can use wp-cli in **Vagrant box** and **Production**. Just run this to see all commands:

```bash
$ wp --help
```

> **Note:** You can call `wp` command anywhere without `--path` parameter because the environment handles paths for you.

More information about wp-cli can be found in [wp-cli.org](http://wp-cli.org)

## Useful commands

### Database export/import (dumping db)
```bash
# Dumps the database to a provided filename
$ wp db export your-dump-filename.sql

# Imports the dump file from file
$ wp db import your-dump-filename.sql
```

### Create user

This creates a new administrator user **'username'** with password **'newpassword'**:

```bash
$ wp user create username email --user_pass=newpassword --role=administrator
```

### Search-Replace database contents

After you have pulled database from production it's useful to regex replace urls:

```bash
$ wp search-replace http://example.com http://example.test
```
