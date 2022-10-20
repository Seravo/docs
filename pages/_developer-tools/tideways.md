---
layout: page
title: "Profiling with Tideways"
order: 5
---

> **Recent PHP version required:** To use the Tideways integration, make sure you have PHP 7.2 (or newer) activated (with `set $mode php7.2;`). You want your site to be as fast as possible, right?

## Xdebug is not for production use

We have provided a [pre-installed Xdebug]({{ site.baseurl }}/developer-tools/xdebug ) configuration in our Seravo WordPress Vagrant images for a number of years already, but not in our production or staging environments. The reason for this is that the instrumentation Xdebug does is quite heavy and it can be performed only in a separate development environment. For production environments something more lightweight is needed, a tool that does not slow down the site. Also to complement long running in-production tests one needs a good dashboard and tools to extract useful information from the profiling data collected. Therefore we decided to cooperate with [Tideways](https://tideways.com/profiler/pricing/seravo-wordpress-premium-hosting) and integrate their profiling tool into our system.

## Tideways can be safely used in both production and staging all the time

[Tideways](https://tideways.com/profiler/pricing/seravo-wordpress-premium-hosting) is a service to collect and analyze information about how the code of your WordPress site performs. It helps developers to:
* Visualize changes in the site production code performance over time
* Drill down into execution logs and find bottle necks in PHP code
* Analyze database queries so their performance can be optimized
* Alert about PHP errors and analyze stack traces so the code can be improved to avoid the errors
* E-mail, Slack, Github and other integrations

![Tideways main dashboard]({{site.baseurl}}/images/tideways-dashboard.png)

The Tideways profiling agent has a neglible impact on the performance of the site, so **it can be active in the backgroud all the time**. In our integration we have configured it to sample 1% of production site PHP executions and 10% of executions in the staging shadows, collecting execution traces and profiling data. The Tideways integration also has the Tideways agent pre-configured to work optimally with WordPress. Data from the production and staging shadows is automatically separated in the logs, so developers can easily tell what data came from where.

![Tideways trace timeline]({{site.baseurl}}/images/tideways-timeline.png)

Tideways offers the same timeline and execution path visualizations as XDebug+Webgrind, but in addition it will also store the PHP profiling traces permanently in an online database, which allows you to compare changes over time. Thanks to the team functionality you can share the information between all the development team members. Tideways even has automatic bottle neck detection and it gives improvement suggestions. Analyzing and improving your application could not be easier. Tideways has a ton of features and we **strongly recommend you to try it out**.

> **Tideways.com subscription recommended:** Note that the free trial version of Tideways does not include all features. For example no traces from your code running in staging environments on Seravo's servers will be shown on Tideways unless you have [at least the Lite plan on Tideways.com](https://tideways.com/profiler/pricing/seravo-wordpress-premium-hosting).

### Steps to activate Tideways

* Create an account at [Tideways](https://tideways.com/profiler/pricing/seravo-wordpress-premium-hosting). You can start with a free trial and later upgrade to a paid account.
* In the Tideways dashboard, create a new application and get the application API key (e.g. A0A0A0A0A0A0A0A0).
* Create a file /data/wordpress/.tideways.key in your project and save the application API key in it (e.g. `echo 'A0A0A0A0A0A0A0A0' > .tideways.key`).
* In your production site environment, run `wp-restart-php` to active the PHP module and the Tideways daemon with your Tideways key.
* Double check that you are running [PHP 7.2 or newer]({{ site.baseurl }}/configuration/php-versions ).
* Go back to your Tideways dashboard to see the data start pouring in!

Seravo's customer support is available to help you with the Tideways key activation if the steps above didn't work for you as expected.

### Invite more users to your account

Once you have a login to Tideways.com, you can setup a organization and invite more users to your account. The more users your account has, the more people have access to the collected profiling data and can potentially find out things to optimize and improve. One could for example share access to the entire development team!

![Creating an organization on Tideways]({{site.baseurl}}/images/tideways-create-organization.png)

The fixed monthly fee of Seravo does not include any site specific performance optimization work, but our expertise on the topic can be utilized on per hour consulting basis. In such a case you could invite the Seravo staff member to your Tideways account to review the collected data.

![Inviting users to your organization/application on Tideways]({{site.baseurl}}/images/tideways-invite-user.png)
