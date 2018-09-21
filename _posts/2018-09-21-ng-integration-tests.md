---
layout: page
title: "Acceptance tests using Codeception"
category: tests
order: 1
date: 2018-09-21 11:36:22
summary: "Seravo uses Codeception tests as acceptance tests for all sites. \nHere you can find examples and documentation of available functions."
---

## What are acceptance tests?

Acceptance tests make sure that certain features of your site work as they should.

For example if we have the following **use case**:

> User visits your-site.com/wp-login.php and sees the login form.

> When user fills correct password and username he sees the WordPress dashboard including adminbar.

When the project is functional we will have the feature described above. Acceptance tests can be used to make sure that the feature works as described in the use case.

Tests mentioned above have been already implemented by Seravo, see `/usr/share/seravo/tests/tests/acceptance/SeravoCheckWPHomeCest.php` and `/usr/share/seravo/tests/tests/acceptance/SeravoCheckWPLoginCest.php`.

## Testing with Codeception

Our acceptance tests use a PHP testing framework called [Codeception](https://codeception.com/). We use the headless browser [Google Chrome](https://www.google.com/chrome/) with the [ChromeDriver](http://chromedriver.chromium.org/).

> **Note:** These tests are used in your production system as well *(if available)*.
>
> This way we can figure out if the site is still working after updates so that we can alarm you when something breaks and hand the updating process to be manually by the owner.

## How to run these tests

You can use this [command]({{ site.baseurl }}{% post_url 2015-10-13-available-commands %}#wp-test-ng) in any environment (production, shadow, and Vagrant development box):

```bash
# Runs first global tests from /usr/share/seravo/tests/tests/acceptance/*.php and
# then **if successful**,
# runs all tests in /data/wordpress/tests/acceptance/*.php if any available
$ wp-test-ng
```

## Example tests

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

## How to extend the tests

All files located in the path `/data/wordpress/tests/acceptance/*.php` will be executed. Group the tests that test the same features and try to name the files logically to make it easier for your collaborators to debug or extend the tests later.

Note that our testing environment expects that a) your test files are named `YourTestNameHereCest.php` and include a class with exactly same name (see examples above) OR b) are named `YourTestName.php` andd are in Cept format. [See short examples in StackOverflow.](https://stackoverflow.com/a/27298882)

To try your new test, run it individually with verbose output:

```
wp-test-ng --debug
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
