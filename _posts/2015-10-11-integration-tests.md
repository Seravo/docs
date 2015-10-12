---
layout: page
title: "Integration tests using Rspec"
category: tests
date: 2015-10-11 03:28:22
---

## What are integration tests?
Integration tests make sure that certain features of your site work as they should work.

So for example if we have a following **usecase**:

> User visits your-site.com/wp-login.php and sees login form.

> When user fills correct password and username he sees WordPress dashboard including adminbar.

So when the project is functional we have the feature described above and we want it to work always.

Integration tests make sure that this feature works as described in usecase.

## Testing with Rspec & Capybara
Our integration tests use ruby testing framework called [Rspec](http://rspec.info/) with extension [Capybara](http://jnicklas.github.io/capybara/).

We use headless browser [Phantomjs](http://phantomjs.org/) with ruby driver [Poltergeist](https://github.com/teampoltergeist/poltergeist).

Using ruby for testing php application like WordPress may sound overwhelming but in our opinion it's quite fun and effective. Our latest WordPress test template can be found in [Github](https://github.com/Seravo/wordpress/blob/master/tests/rspec/). It consists as a good starting point for your own unique tests.

**These tests are used (if available) in your production system as well.** This way we can figure out if the site is still working after updates so that we can alarm you when something breaks and hand the updating process to be manually by the owner.

## Example tests
The following test suite consists of 2 ```describe``` blocks. The first one tests that the frontpage is loaded correctly and has css styles. Then it clicks link in frontpage and expects the following page to contain text **Archives**. The second one tests the usecase mentioned in the top of this page.


```ruby
# Use preconfigured poltergeist/phantomjs rules and load WP class
require_relative 'lib/config.rb'

### Begin tests ###

describe "wordpress: #{WP.host} - ", :type => :request, :js => true do 

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

## How to run these tests
You can use this command in **Production** and **Vagrant box**:

```bash
# Runs all tests in /data/wordpress/tests/rspec/*.rb
$ wp-test
```

## List of Helper functions

### **WP** Helper module
These tests use helper module **WP** which is included in the project.

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
WP.user.lastname    # Test user lastname - by default: WP-Palvelu
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

# scoping
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

#Scripting #
  result = page.evaluate_script('4 + 4');

# Debugging
  save_and_open_page

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
```
Source: https://gist.github.com/zhengjia/428105.
