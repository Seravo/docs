---
title: "wp-load-test-ng"
---


# NAME

wp-load-test-ng - manual page for wp-load-test-ng git version fba2a66

# DESCRIPTION

usage: wp-load-test-ng \[-h\] \[--version\] \[--cache\] \[--initial-qps
INITIAL\_QPS\]

  - \[--interval INTERVAL\]  
    \[--latency \[LATENCIES \[LATENCIES ...\]\]\] \[--max-logs
    MAX\_LOGS\] \[--max-qps MAX\_QPS\] \[--use-nginx-logs\] \[--num-bots
    NUM\_BOTS\] \[--num-intervals NUM\_INTERVALS\]
    \[--num-failed-intervals NUM\_FAILED\_INTERVALS\] \[--qps-add
    QPS\_ADD\] \[--safe-time SAFE\_TIME\] \[--url-file URL\_FILE\] \[url
    \[url ...\]\]

Simple loadtesting tool for WordPress sites.

## positional arguments:

  - url  
    Site URL to the target site.

## optional arguments:

  - **-h**, **--help**  
    show this help message and exit

  - **--version**  
    show program's version number and exit

  - **--cache**  
    If **--cache** is not used, "Pragma: no-cache" header is set.

  - **--initial-qps** INITIAL\_QPS  
    Initial total QPS from all load bots.

  - **--interval** INTERVAL  
    Duration of a round.

  - **--latency** \[LATENCIES \[LATENCIES ...\]\]  
    Set latency requirement **--latency**=*percentile*,max\_latency
    where percentile is a float in range \[0, 100\] and max\_latency is
    a positive value in seconds (float). Example: **--latency**=*99*,2.5
    means that the 99th percentile latency should be less than 2.5s.
    percentile == 100 means maximum latency. This option can be used
    many times to specify multiple latency requirements. E.g.
    simultaneously set both median and maximum latency.

  - **--max-logs** MAX\_LOGS  
    Maximum number of URLs to replay. Zero means no limit.

  - **--max-qps** MAX\_QPS  
    Total maximum QPS from all load bots.

  - **--use-nginx-logs**  
    Use nginx logs for load test. Read all HTTP GET requests with status
    code 200.

  - **--num-bots** NUM\_BOTS  
    Set the number of load bots sending traffic to the target site

  - **--num-intervals** NUM\_INTERVALS  
    Send constant QPS for given amount of intervals (each interval with
    duration given by **--interval**) before ramping up QPS.

  - **--num-failed-intervals** NUM\_FAILED\_INTERVALS  
    Report failure if load test criteria are not met in given many
    consecutive intervals.

  - **--qps-add** QPS\_ADD  
    Increase load in steps of given QPS.

  - **--safe-time** SAFE\_TIME  
    Wait given many seconds before starting the load test.

  - **--url-file** URL\_FILE  
    Path to file containing one URL per line. Empty lines and lines
    beginning with \# are ignored.
