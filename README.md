# Developer Documentation for Seravo.com customers

This repository is used to generate the documentation at [https://seravo.com/docs](https://seravo.com/docs)

The repository uses Jekyll to generate HTML of the Markdown text files.

## Adding pages

You can add a new page by creating a new Markdown file inside of some of the collection directories under the `pages/` directory.

The new page file should start with a header that includes the following information:
```
---
layout: page
title: "My new help article"
order: 1
summary: "Description for my new help article"
---

Actual content...
```

Write the article following the Markdown syntax. You may want to refer to a [syntax guide](https://guides.github.com/features/mastering-markdown/).

## Running locally

You may want to preview your changes while writing an article or developing the site. You can run this Jekyll site locally if you have [Bundler and Jekyll installed](https://jekyllrb.com/docs/installation/).

Install the gems and start the local server:
```
docs$ bundle config set path 'vendor/bundle'
docs$ bundle install
docs$ bundle exec jekyll serve
```

The site is now accessible from http://127.0.0.1:4000/docs/.

## Publishing the pages

The head of the `master` branch will automatically be built by GitHub and the result visible at [https://seravo.com/docs](https://seravo.com/docs).

## Template source
This is based on template: http://bruth.github.io/jekyll-docs-template
