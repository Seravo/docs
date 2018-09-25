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

Tests mentioned above in the previous chapter have been already implemented by Seravo and you can check out how the code looks like in the files `/usr/share/seravo/tests/tests/acceptance/SeravoCheckWPHomeCest.php` and `/usr/share/seravo/tests/tests/acceptance/SeravoCheckWPLoginCest.php`.

## Running tests

You can use this [command]({{ site.baseurl }}{% post_url 2015-10-13-available-commands %}#wp-test-ng) in any environment (production, shadow, and Vagrant development box):

```bash
# Runs first global tests from /usr/share/seravo/tests/tests/acceptance/*.php and
# then **if successful**,
# runs all tests in /data/wordpress/tests/acceptance/*.php if any available
$ wp-test-ng
```

> **Note:** These tests can be run by Seravo or the client at any time, in any environment. The tests should therefore be safe and not cause any problems even when run against a live production website.

## Write your own tests

All files located in the path `/data/wordpress/tests/acceptance/*.php` will be executed. Group the tests that test the same features and try to name the files logically to make it easier for your collaborators to debug or extend the tests later.

If this directory does not exist on your site (or the git version control of your site), then you can just go ahead and create it. The new generation testing system is much simpler and does not pollute your site git repository with many extra files like our previous system did. When you start using the new system, feel free to delete all of your old `/data/wordpress/tests/rspec`. The rspec-directory will not get any updates anymore and in the new system any updates by Seravo to the testing system will be done outside of the site directory `/data/wordpress` and thus not cause any merging issues for site developers.

Note that our testing environment expects that a) your test files are named `YourTestNameHereCest.php` and include a class with exactly same name (see examples above) OR b) are named `YourTestName.php` andd are in Cept format. [See short examples in StackOverflow.](https://stackoverflow.com/a/27298882)

To try your new test, run it individually with verbose output:

```
wp-test-ng --debug
```
### Example code

The following test suite consists of two class methods that implement different tests blocks.

First one checks that we see some elements on home page and then submits a search form & checks that we see expected string on the result page.

Second one just checks that we see/don't see some elements in DOM.

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

## List of Helper functions

### **WP** Helper module
These tests use the helper module **SeravoAcceptanceHelper** which is included in the project.

```php
$I->getEnvironment(); // returns current environment (production, development, staging, update)
$I->isProduction(), $I->isDevelopment(); // are we in specific environment
$I->getLogs(); // get logs from browser console
```

### List of Codeception functions
See also [Codeception documentation for acceptance tests](https://codeception.com/docs/03-AcceptanceTests) to learn more.
```php
# Navigating
$I->amOnPage('/path/to/navigate?value=1');

# Clicking links and buttons
$I->click('#elementId');
$I->click('a.classnamehere');
$I->click('input[name=ok]');

# Interacting with forms
$I->fillField('field-identifier', 'value');


# Querying
$I->seeInTitle('this should be in <title> tag');
$I->see('My title');
$I->seeElement('//table/tr'); // xpath
$I->seeElement('h1'); // by tag
$I->seeElement('#id'); // by id
$I->seeElement('.classname'); // by class
$I->seeElement('div#main p.intro'); // css selectors
```
