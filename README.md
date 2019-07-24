# Developer Documentation for Seravo.com customers

This repository is used to generate the documentation at [https://seravo.com/docs](https://seravo.com/docs)

The repository uses Jekyll to generate HTML of the Markdown text files.

## Adding pages

You can add new pages using included `bin/jekyll-page`

For example add SSH page to get started
```bash
ruby bin/jekyll-page "Configure SSH" get-started
```

## Building the pages

TODO

## Local development

### Ubuntu 18.04

Install the system-wide depencies:
```
sudo apt install git ruby ruby-dev build-essential
```

Install bundler (may require sudo, or --user-install):
```
gem install bundler
```

Git clone the docs and move into the directory
```
git clone https://github.com/Seravo/docs.git
cd docs
```

Install the project-specific gems
```
bundle install
```

NOTE: If the `bundle install` fails with cryptic `GemNotFounError`, `gem update --system` is needed.

Finally, run the jekyll server
```
bundle exec jekyll serve
```

The site should be auto-generated to http://127.0.0.1:4000/docs/

## Publishing the pages

The head of the gh-pages branch will automatically be built by GitHub and the result visible at [https://seravo.com/docs](https://seravo.com/docs).

## Template source
This is based on template: http://bruth.github.io/jekyll-docs-template
