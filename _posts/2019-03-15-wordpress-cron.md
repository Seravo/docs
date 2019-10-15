---
layout: page
title: "WordPress Cron"
category: configuration
date: 2019-03-15 13:18:00
order: 5
---

> **Beware of bad advice!** There are a lot of old guides out there that recommend putting something like `*/1 * * * * curl https://example.com/wp/wp-cron.php` in your system cron. _Never do that!_ It is outdated advice and will only do harm to any modern WordPress project.

The WordPress cron fully works out-of-the-box and developers do not have to do anything special about it. To register your own scheduled events, please learn the [WordPress Cron API](https://codex.wordpress.org/Function_Reference/wp_schedule_event) carefully and in general do read the excellent [WordPress Plugin Developer Handbook](https://developer.wordpress.org/plugins/cron/) so you know how to design your WordPress plugin or theme code correctly from the start.

## What is scheduled

Any plugin or theme can schedule events, so the list of events for each site is individual. The easiest way to check it out is using [wp-cli](https://wp-cli.org/):

```
$ wp cron event list
+-----------------------------------------+---------------------+-----------------------+---------------+
| hook                                    | next_run_gmt        | next_run_relative     | recurrence    |
+-----------------------------------------+---------------------+-----------------------+---------------+
| check_plugin_updates-builder-pro-update | 2019-03-15 11:16:12 | now                   | 12 hours      |
| wp_privacy_delete_old_export_files      | 2019-03-15 11:18:22 | 1 minute 25 seconds   | 1 hour        |
| wp_update_plugins                       | 2019-03-15 17:16:29 | 5 hours 59 minutes    | 12 hours      |
| wp_update_themes                        | 2019-03-15 17:16:29 | 5 hours 59 minutes    | 12 hours      |
| wp_scheduled_delete                     | 2019-03-15 17:17:09 | 6 hours               | 1 day         |
| wp_version_check                        | 2019-03-15 17:18:01 | 6 hours 1 minute      | 12 hours      |
| check_plugin_updates-wppb-bdp-add-on    | 2019-03-15 17:36:46 | 6 hours 19 minutes    | 12 hours      |
| sm_ping_daily                           | 2019-03-15 18:20:52 | 7 hours 3 minutes     | 1 day         |
| wp_scheduled_auto_draft_delete          | 2019-03-15 18:50:37 | 7 hours 33 minutes    | 1 day         |
| trigger_live_discussion_notification    | 2019-03-18 07:40:00 | 2 days 20 hours       | Non-repeating |
| trigger_live_discussion_notification    | 2019-04-08 12:45:00 | 3 weeks 3 days        | Non-repeating |
+-----------------------------------------+---------------------+-----------------------+---------------+
```

Note the column **next_run_relative**. If there are many items marked **now** and they stay as such, it is a sign that the cron is not running correctly. If a developer does a web search on "WordPress" and "cron" they often find advice about running _curl_ or _wget_ from the system cron. Such advice is plain *outdated* and should be completely discarded, as it will not fix the issue at all. Never do that. If there is a problem with a scheduled event not running, the code needs to be debugged and fixed.

## Testing cron jobs

The great wp-cli has a built-in function to test cron. It can look like this:
```
$ wp cron test
Success: WP-Cron spawning is working as expected.
```

An example of a failing cron:
```
$ wp cron test
Error: The DISABLE_WP_CRON constant is set to true. WP-Cron spawning is disabled.
```

Alternatively you can try running all due events:
```
$ wp cron event run --due-now
Executed the cron event 'check_plugin_updates-profile-builder-pro-update' in 0.175s.
Success: Executed a total of 1 cron event.
```

One may also trigger an individual event like this:
```
$ wp cron event run check_plugin_updates-profile-builder-pro-update
Executed the cron event 'check_plugin_updates-profile-builder-pro-update' in 0.17s.
Success: Executed a total of 1 cron event.
```

If the function executes and there are no errors immediately visible, or in the `/data/log/php-error.log`, then the code in that function probably works.

## Triggering WordPress Cron from system Cron

This is not recommended practice, but if you for some reason really want to trigger the WP cron from the system cron, this is the line you would add to crontab:

```
* * * * * /usr/local/bin/wp cron event run --due-now >> /data/log/wp-cron.log 2>&1
```

The crontab syntax can be a bit confusing, so we recommend playing around with [crontab.guru's](https://crontab.guru/) interactive helper tool before adding crontab. One should also consider logging both stdout and stderr like done in the exampe above, or using a `MAILTO` definition to get crontab event notifications per e-mail.

# Time zones

When doing time sensitive things, please keep in mind that Seravo's servers all have their hardware clock set to UTC time, and the system time zone setting is according to the location of the server cluster.

Further, keep in mind that WordPress resets all time zone data and inside WordPress the timezone is always UTC. For printing times inside WordPress use the special [WordPress time functions](https://codex.wordpress.org/Formatting_Date_and_Time) `the_date()` and `the_time()`. Please consider the examples below:

```
$ date -R
Fri, 22 Mar 2019 10:00:00 +0200

$ php -r "echo date('r');"
Fri, 22 Mar 2019 10:00:00 +0200

$ wp eval "echo date('r');"
Fri, 22 Mar 2019 08:00:00 +0000
```
