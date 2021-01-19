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

## Publishing the pages

The head of the `master` branch will automatically be built by GitHub and the result visible at [https://seravo.com/docs](https://seravo.com/docs).

## Template source
This is based on template: http://bruth.github.io/jekyll-docs-template
