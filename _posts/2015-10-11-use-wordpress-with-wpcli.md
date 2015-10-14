---
layout: page
title: "Manage with wp-cli"
category: management
date: 2015-10-11 03:39:48
published: true
---

## Basics
You can use wp-cli in Vagrant and Production. Just run run this to see all commands:

```bash
$ wp --help
```

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

This creates new administrator user **'admin'** with password **'admin'**:

```bash
$ wp user create admin admin@wordpress.dev --user_role=administrator --user_pass=admin
```

### Search-Replace database contents

After you have pulled database from production it's useful to regex replace urls:

```bash
$ wp search-replace http://original.com http://original.dev
```