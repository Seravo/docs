---
layout: page
title: "Integration tests using Rspec"
category: tests
order: 1
date: 2015-10-11 03:28:22
---

> **Deprecated:** The legacy Rspec-based test system described on this page has been replaced by our a new testing system based on [headless Chrome and Codeception]({{ site.baseurl }}{% post_url 2018-09-21-ng-integration-tests %}). This page is kept purely for historical reference and will be deleted later in 2019..

> For more information see [new testing system announcement at Seravo.com](https://seravo.com/blog/the-next-generation-wordpress-testing-system/).

## What are integration tests?

Integration tests make sure that certain features of your site work as they should.

For example if we have the following **use case**:

1. User visits your-site.com/wp-login.php and sees the login form.
1. When user fills correct password and username he sees the WordPress dashboard including adminbar.

When the project is functional we will have the feature described above. Integration tests can be used to make sure that the feature works as described in the use case.

## Testing with Rspec & Capybara

Our integration tests use a Ruby testing framework called [Rspec](http://rspec.info/) with the extension [Capybara](https://github.com/teamcapybara/capybara).

We use the headless browser [PhantomJS](http://phantomjs.org/) with the Ruby driver [Poltergeist](https://github.com/teampoltergeist/poltergeist).

Using Ruby for testing a PHP application like WordPress may sound overwhelming but in our opinion it's quite fun and effective. Our latest WordPress baseline template can be found in [Github](https://github.com/Seravo/wordpress/blob/master/tests/rspec/). It can be used as an example for your own unique tests.

> **Note:** These tests are used in your production system as well *(if available)*.
>
> This way we can figure out if the site is still working after updates so that we can alarm you when something breaks and hand the updating process to be manually by the owner.

## How to run these tests

You can use this [command]({{ site.baseurl }}{% post_url 2015-10-13-available-commands %}#wp-test) in **Production** and **Vagrant box**:

```bash
# Runs all tests in /data/wordpress/tests/rspec/*.rb
$ wp-test
```

## Example tests

The following test suite consists of two ```describe``` blocks.

The first one tests that the front page is loaded correctly and has CSS styles. Then it clicks a link in the front page and expects the following page to contain text **Archives**.

The second one tests the use case we talked about in the beginning of this page.


```ruby
# Use preconfigured Poltergeist/PhantomJS rules and load WP class
require_relative 'lib/config.rb'

### Begin tests ###

describe "WordPress: #{WP.host} - ", :type => :request, :js => true do

  subject { page }

  describe "frontpage" do

    before do
      visit WP.siteurl('/')
    end

    it "Healthy status code 200" do
      expect(page).to have_status_of [200]
    end

    it "Page includes stylesheets" do
      expect(page).to have_css
    end

    it "After user clicks archive link, User should see archives" do
      click_link('October 2015')
      expect(page).to have_content 'Archives'
    end
  end

  describe "admin-panel" do

    before do
      visit WP.siteurl('/wp-login.php')
    end

    it "There's a login form" do
      expect(page).to have_id "wp-submit"
    end

    # Only try logging in if we could create a test user
    if WP.user?
      it "Logged in to WordPress Dashboard" do
        within("#loginform") do
          fill_in 'log', :with => WP.user.username
          fill_in 'pwd', :with => WP.user.password
        end
        click_button 'wp-submit'
        # Should obtain cookies and be able to visit /wp-admin
        expect(page).to have_id "wpadminbar"
      end
    end
  end

end
```

## How to extend the tests

All files located in the path `tests/rspec/*.rb` will be executed. Instead of editing the existing baseline tests, we recommend creating new files for your own tests. Group the tests that test the same features and try to name the files logically to make it easier for your collaborators to debug or extend the tests later.

To try your new test, run it individually with verbose output:

```
rspec -f d new-test.rb
```

Rspec also has a profiling option available if you want to measure how long the test takes and potentially detect some execution time anomalies:

```
rspec -f d -p 10 new-test.rb
```

## List of Helper functions

### **WP** Helper module
These tests use the helper module **WP** which is included in the project.

```ruby
# Returns url to your site for the following {path}
# @return string - url to your site
WP.siteurl(path)
WP.url(path)

# Returns the hostname/domain which is defined for WordPress
# @return string - hostname of WordPress
WP.hostname()
WP.host()

# Check if a testuser was created successfully
# @return bool
WP.user?

# Returns the user object
# @return User object
WP.user

# User has following attributes:
WP.user.username    # Username for the WordPress
WP.user.password    # Password for the WordPress
WP.user.firstname   # Test user firstname - by default: Test
WP.user.lastname    # Test user lastname - by default: Seravo
WP.user.email       # Test user email - by default: testbotuser@{your-site}

```

### List of Capybara functions

```ruby
# Navigating
visit('/projects')
visit(post_comments_path(post))

# Clicking links and buttons
click_link('id-of-link')
click_link('Link Text')
click_button('Save')
click('Link Text') # Click either a link or a button
click('Button Value')

# Interacting with forms
fill_in('First Name', :with => 'John')
fill_in('Password', :with => 'Seekrit')
fill_in('Description', :with => 'Really Long Text…')
choose('A Radio Button')
check('A Checkbox')
uncheck('A Checkbox')
attach_file('Image', '/path/to/image.jpg')
select('Option', :from => 'Select Box')

# Scoping
within("//li[@id='employee']") do
  fill_in 'Name', :with => 'Jimmy'
end
within(:css, "li#employee") do
  fill_in 'Name', :with => 'Jimmy'
end
within_fieldset('Employee') do
  fill_in 'Name', :with => 'Jimmy'
end
within_table('Employee') do
  fill_in 'Name', :with => 'Jimmy'
end

# Querying
page.has_xpath?('//table/tr')
page.has_css?('table tr.foo')
page.has_content?('foo')
page.should have_xpath('//table/tr')
page.should have_css('table tr.foo')
page.should have_content('foo')
page.should have_no_content('foo')
find_field('First Name').value
find_link('Hello').visible?
find_button('Send').click
find('//table/tr').click
locate("//*[@id='overlay'").find("//h1").click
all('a').each { |a| a[:href] }

# Scripting
result = page.evaluate_script('4 + 4');

# Asynchronous JavaScript
click_link('foo')
click_link('bar')
page.should have_content('baz')
page.should_not have_xpath('//a')
page.should have_no_xpath('//a')

# XPath and CSS
within(:css, 'ul li') { ... }
find(:css, 'ul li').text
locate(:css, 'input#name').value
Capybara.default_selector = :css
within('ul li') { ... }
find('ul li').text
locate('input#name').value

# Source: https://gist.github.com/zhengjia/428105.
```
