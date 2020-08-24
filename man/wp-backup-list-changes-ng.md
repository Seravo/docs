---
title: "wp-backup-list-changes-ng"
---


# NAME

wp-backup-list-changes-ng - manual page for wp-backup-list-changes-ng
git version fba2a66

# DESCRIPTION

usage: wp-backup-list-changes-ng \[-h\] \[--version\]

> \[--increments-dir INCREMENTS\_DIR\]

Lists all files known by rdiff-backup sorted by timestamp. Use this to
find out what files really changed in the system, as the file attribute
mtime is not a reliable source of information. "." before filename
indicates the file was modified. "+" before filename indicates the file
was added. "-" before filename indicates the file was removed. Use
'rdiff-backup **--exclude** */data/backups* **--compare-at-time** now
*/data* /data/backs/data/' to find out how the current data differs from
latest backup.

## optional arguments:

  - **-h**, **--help**  
    show this help message and exit

  - **--version**  
    show program's version number and exit

  - **--increments-dir** INCREMENTS\_DIR  
    rdiff-backup directory containing increments
