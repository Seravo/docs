---
layout: page
title: "Headless WordPress"
category: configuration
date: 2020-10-19 15:23:00
order: 12
---
In the WordPress context, headless means that the website visitor is always server a static, single-page application type of HTML page instead of the normal WordPress PHP generated HTML page from a WordPress theme. On a headless site WordPress is still kept in the background and used to manage the contents of the site.

The static site is often built in ReactJS or some other JavaScript framework for building application like websites. The JavaScript code of the static then runs WP-REST API requests to fetch the actual contents of the site, thus making the contents dynamic.

## Headless WordPress sites are easy to make at Seravo

Seravo's environment comes with many NodeJS tools already installed, such as Gulp, Node-SASS and webpack. There is also npm available to install more libraries and tools. NodeJS at Seravo is intended to help compile and build the static site and it's assets and there is no option for a long-running NodeJS process as it is not needed in this use case.

**To make the site serve a static page instead of the default WordPress front page, simply drop a `index.html` file into the the `htdocs` directory.** Once this file is in place, access to WordPress backend at `/wp-admin/` still fully works.

## Considerations when making headless WordPress pages

Going headless might feel tempting as a technological feat for many developers, but keep in mind that the technology is still new and immature. There are still many details about how to solve navigation, indexability by search machines, SEO optimization, performance etc.

For the data access the primary and best supported option is to use the existing WP-JSON endpoints. Some also install a GraphQL plugin and use the custom endpoints it offers. If you use GraphQL, remember to use GET requests to benefit from caching, as POST requests are never cached.

## Performance considerations

One advantage with headless sites is the ability to make them offline compatible and in some cases load very fast.

Please note that at Seravo, all sites plans include server level HTTP caching and thus, if not planned carefully, a headless implementation may fall behind in performance and speed compared to traditional WordPress sites where the PHP generated HTML output with embedded contents is cached at the server level and delivered at the same speed as a headless site template that still lacks the contents.
