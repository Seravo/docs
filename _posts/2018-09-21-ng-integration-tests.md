---
layout: page
title: "New generation testing system"
category: tests
order: 1
date: 2018-09-21 11:36:22
---

> **Roll-out in progress:** Our next-generation testing system based on [ChromeDriver](http://chromedriver.chromium.org/) and [Codeception](https://codeception.com/) is available as a technology preview using the command `wp-test-ng`. Eventually it will replace the old `wp-test` (*legacy system based on [Rspec]({{ site.baseurl }}{% post_url 2015-10-11-integration-tests %})*) but we will announce when we have reached that milestone separately.


## Testing ensures WordPress updates don't break a site

Tested updates has always been an integral part of Seravo's WordPress service. Keeping software up-to-date is important for both functionality and security. Unfortunately all changes in new software releases are not always good and can cause regressions. At Seravo we run tests before and after updates to ensure the site does not break on updates.

## Tests use the site like a real visitor would do

Our tests are so called acceptance tests (or integration tests) because they test the site on a high level (and not single pieces of code like unit tests would do). The goal is to browse the site like a real visitor would do and find problems that could be relevant to real users.

Our tests simulate among others the following **use cases**:
1. User visits your-site.com/wp-login.php and sees the login form.
1. When user fills correct password and username he sees the WordPress dashboard including adminbar.

Our system will detect if during these simulated visits any of the following problems occur:
- The HTTP server fails and emits error code (e.g. HTTP 500)
- WordPress/PHP code fails and does not generate a page that a browser could sensibly parse
- CSS code fails to load or images or other assets fail to load
- JavaScript emits warnings or errors to the JavaScript console

If any of the failures above occur, the test will end and emit an error. Sites where the tests don't pass will not proceed with updates.

> **Note on security updates**: If a security update is considered critical, Seravo will ignore any test results and proceed with installing the security update anyway when necessary.

The `wp-test-ng` command and Codeception tests also make screenshots of the site, which is later used by another step in our testing system to detect visual regressions.

## Testing is separate from monitoring

Testing can be used by developers to verify that their code changes don't break a site. Seravo uses the tests to check that a site is OK before and after updates. Seravo also does many other kinds of testing to sites, including security testing, PHP version compatibility testing etc.

Seravo monitors all sites 24/7 and our staff reacts if we detect that a site has stopped working. The monitoring is based on other tests, not these acceptance tests.

## New generation testing technology: Codeception and headless Chrome

Our new testing system uses a PHP testing framework called [Codeception](https://codeception.com/). This will make it easier for WordPress developers to write tests compared to how it was in our previous testing system that used Ruby.

The simulated browsing of a site is done using headless [Google Chrome](https://www.google.com/chrome/) with the [ChromeDriver](http://chromedriver.chromium.org/). This is as close to the real thing as possible, and a major improvement to our previous system that used PhantomJS.

Tests mentioned above in the previous chapter have been already implemented by Seravo and forms the baseline of the tests for each site.

## Running tests

You can use the [command wp-test-ng]({{ site.baseurl }}{% post_url 2015-10-13-available-commands %}#wp-test-ng) in any environment (production, testing/staging shadow, and Vagrant development box):

```bash
$ wp-test-ng
I: Starting wp-test-ng...
I: Using URL 'https://www.example.com' for pre-flight checks.
I: Pre-flight test for https://www.example.com returned HTTP code 200
I: Executing ChromeDriver...
Starting ChromeDriver 2.41.578700 (2f1ed5f9343c13f73144538f15c00b370eda6706) on port 9515
Only local connections are allowed.
I: Ensure test user exists...
I: Updated permission and password for existing test user...
I: Running Codecept test suite 1/1..
Codeception PHP Testing Framework v2.5.0
Powered by PHPUnit 6.5.13 by Sebastian Bergmann and contributors.
Running with seed:


Acceptance Tests (2) ------------------------------------------------------------------------------------
⏺ Recording ⏺ step-by-step screenshots will be saved to /data/reports/tests/
Directory Format: record_5bcf04ca2322c_{testname} ----
✔ SeravoCheckWPHomeCest: Try to open home (1.86s)
✔ SeravoCheckWPLoginCest: Try to login and access wp admin (10.60s)
---------------------------------------------------------------------------------------------------------
⏺ Records saved into: file:///data/reports/tests/records.html


Time: 12.76 seconds, Memory: 12.00MB

OK (2 tests, 3 assertions)
I: Lower test user privileges as test ended...
I: Finished running wp-test-ng
```

> **Note:** These tests can be run by Seravo or our customer at any time, in any environment. The tests should therefore be safe and not cause any problems even when run against a live production website.

## Write your own tests

Test suite files located in the path `/data/wordpress/tests/codeception/` will be executed. Group the tests that test the same features and try to name the files logically to make it easier for your collaborators to debug or extend the tests later.

If this directory does not exist on your site (or the git version control of your site), then you can just go ahead and create it. The new generation testing system is much simpler and does not pollute your site git repository with many extra files like our previous system did. When you start using the new system, feel free to delete all of your old `/data/wordpress/tests/rspec`. The *rspec* directory will not get any updates anymore and in the new system any updates by Seravo to the testing system will be done outside of the site directory `/data/wordpress` and thus not cause any merging issues for site developers.

There are three types of customs tests supported:
1. Tests written in procedural PHP code in files at `/data/wordpress/tests/codeception/acceptance/*Cept.php`
1. Tests written in object-oriented PHP classes in files at `/data/wordpress/tests/codeception/acceptance/*Cest.php`
1. Custom Codeception test suite defined in `/data/wordpress/tests/codeception/custom.yml`

### 1. Simplest version: \*Cept.php files

This is very straight forward and simple to write and maintain for a small set of tests.

Example filename: `/data/wordpress/tests/codeception/acceptance/ExampleCept.php`

```php
<?php

$I = new AcceptanceTester($scenario);
$I->amOnPage('/');
$I->checkBrowserConsole();
$I->see('WordPress');
```

[See short examples in StackOverflow.](https://stackoverflow.com/a/27298882)

### 2. Elegant version: \*Cest.php files

Using proper PHP classes offer control on what tests output and how they are executed. **Note that each file can contain only one PHP class and the class name must match the filename.**

Example filename: `/data/wordpress/tests/codeception/acceptance/ExampleCest.php`

```php
<?php

class ExampleCest {
    /**
     * Open front page (/)
     **/
    public function openFrontPage(\AcceptanceTester $I) {
        $I->amOnPage('/');
	      $I->checkBrowserConsole();
        $I->see('WordPress');
    }
}
```

Example filename: `/data/wordpress/tests/codeception/acceptance/UserCheckWPHomeCest.php`

```php
<?php

class UserCheckWPHomeCest
{
    /**
     * Try to do search using form on homepage (/)
     **/
    public function trySubmittingSearch(\AcceptanceTester $I)
    {
        // Navigate to homepage (/)
        $I->amOnPage('/');

        // Check that the browser console is empty (e.g no JavaScript errors)
        $I->checkBrowserConsole();

        // Check that string 'Lorem ipsum' is found
        $I->see('Lorem ipsum');

        // Check that we see h1 level header with id 'maintitle'
        $I->seeElement('h1#maintitle');

        // Check that we see from with name 'searchform'
        $I->seeElement('form[name=searchform]');

        // Fil field with name 'search' with value 'mysearchtermgoeshere'
        $I->fillField('input[name=search]', 'mysearchtermgoeshere');

        // Submit the form by clicking element with id 'submitSearchForm'
        $I->click('#submitSearchForm');

        // Check that we see string 'Search results:' on the page after clicking submit above ^
        $I->see('Search results:');

        // Make screenshot of the result page
        $I->makeScreenshot('searchresults');
    }

    /**
     * Check that hidden element exists on a page
     *
     * Backend used by our testing environment doesn't "see" elements that are hidden to user,
     * but we can check if these elements exists by looking at DOM.
     */
    public function tryIfNonVisibleElementExists(\AcceptanceTester $I) {
        // navigate to page /example
        $I->amOnPage('/example');

        // Search element in DOM (by id, yet again)
        $I->seeElementInDOM('#myhiddenelement');

        // Navigate to another page
        $I->amOnPage('/example2');

        // Make sure we DON'T see unwanted element that should be on this page
        $I->dontSeeElementInDOM('h3#thisshouldnotexist');
    }
}
```

To try your new test, simply run:

```
wp-test-ng --debug --fail-fast
```

> **Note:** Tested Wordpress updates are included in all plans at [Seravo.com](https://seravo.com/plans/), even in the most affordable one. Writing custom tests, or debugging custom test that somebody else wrote, is not included in the monthly fee. You can however at any time buy at an hourly rate bespoke work for your site, including writing custom tests for it.

### 3. Complete custom Codeception test definition: custom.yml

Our tests also support fully customized Codeception test suites. Put the test suite files in the path `/data/wordpress/tests/codeception` and ensure there is a definition file called `custom.yml` that can be run by `codecept run`.

## List of Helper functions

### WordPress Helper module

These tests use the helper module **SeravoAcceptanceHelper** which is included in the project.

```php
// return current environment (production, development, staging, update)
$I->getEnvironment();
// return true or false if tests run in specific environment
$I->isProduction();
$I->isDevelopment();
// get an array containing the browser console contents
$I->getConsoleLog();
```

### List of Codeception functions

See also [Codeception documentation for acceptance tests](https://codeception.com/docs/03-AcceptanceTests) to learn more.

```php
// Navigating
$I->amOnPage('/path/to/navigate?value=1');

// Clicking links and buttons
$I->click('#elementId');
$I->click('a.classnamehere');
$I->click('input[name=ok]');

// Interacting with forms
$I->fillField('field-identifier', 'value');

// Querying
$I->seeInTitle('this should be in <title> tag');
$I->see('My title');
$I->seeElement('//table/tr'); // XPath
$I->seeElement('h1'); // by tag
$I->seeElement('#id'); // by id
$I->seeElement('.classname'); // by class
$I->seeElement('div#main p.intro'); // CSS selectors

// Check that browser console is empty
$I->checkBrowserConsole();

// Check that browser console is empty ignoring warnings
$I->checkBrowserConsole(true);

// Check that browser console is empty ignoring warnings
// and ignoring one specified severe message
$I->checkBrowserConsole(true, array(
  array(
		"level" => "SEVERE",
		"message" => ".* Uncaught DOMException: play() failed because the user didn't interact with the document first.",
		"regex" => true
	)
);
```

### Howto whitelist specific harmless Chrome console errors

As a rule of thumb, **if the Chrome developer console outputs anything, our testing system considers it an error**, regardless of being related to JavaScript, CSS loading, image loading, Mixed content security warnings or whatever.

However, sometimes the Chrome console messages can be false positives and not actual errors that need to be addressed. To handle those we offer console message whitelisting.

A typical example of a false positive would be this JQuery deprecation warning which most website developers have seen in the wild somewhere:
> WARNING: https://example/wp-includes/js/jquery/jquery-migrate.js?ver=1.4.1 44:11 "JQMIGRATE: jQuery.browser is deprecated"

To ignore this messge site-wide, create a file with the name and path `/data/wordpress/tests/codeception/acceptance/console-whitelist.json` and add the following contents to it:

```json
[
	{
		"level": "WARNING",
		"message": ".* JQMIGRATE: .* is deprecated",
		"regex": true
	}
]
```

The field *messge* is compulsory and it must either be a string to be whitelisted, or a regular expression. If regular expressions are used, then there the field *regex* must also be set to *true*. The field *level* is not compulsory.

You can also whitelist console messages per test by passing a custom array as second parameter to the assertion `$I->checkBrowserConsole()`. Using the site-wide whitelist has the benefit that it affects all invocations of `checkBrowserConsole()`, including the baseline tests Seravo runs for your site.
