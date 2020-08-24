---
title: "wp-db-admin"
---


# NAME

wp-db-admin - manual page for wp-db-admin git version fba2a66

# SYNOPSIS

**wp-db-admin**

# DESCRIPTION

Access the MariaDB Proxy admin console.

In the console you can then run queries like:

> SELECT \* FROM stats.stats\_mysql\_connection\_pool;
> 
> SELECT digest,SUBSTR(digest\_text,0,50),count\_star,sum\_time FROM
> stats\_mysql\_query\_digest WHERE digest\_text LIKE 'SELECT%' ORDER BY
> sum\_time DESC LIMIT 25;

## optional arguments:

  - **-h**, **--help**  
    display this help and exit

  - **--version**  
    display version and exit
