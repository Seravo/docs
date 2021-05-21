---
layout: page
title: "Compile assets & automate with Gulp"
order: 8
---

## Using Gulp

You can use [Gulp](http://gulpjs.com/) to automatically minify and compile your assets. This includes turning SASS to CSS or CoffeeScript to JavaScript. Gulp can also optimize your images and do a multitude of other things. With [Browsersync](https://www.browsersync.io/) it can even reload your browser windows across multiple devices automatically.

> **Known Browsersync failure in latest release:** Due to architectural changes in Seravo's Vagrant box, Browsersync does currently not work out-of-the-box. Everything else in the gulp watchfile however works.

## Default Gulp settings require an adaptation to watch for your theme

The Seravo template contains example `gulpfile.js`. Our example compiles sass files from `twentyfifteen` theme. It also has Browsersync already configured for the theme twentyfifteen so you can use it as base for your own projects.

First, install the dependencies specified in `/data/wordpress/package.json`:

`$ cd /data/wordpress/ && npm install`

After this, Browsersync can be started by running:

`$ cd /data/wordpress/ && gulp watch`

When it's started the internal web server (Nginx) automatically reroutes all traffic through Browsersync so that you can have a nice live reload effect while developing.

## Example file

```js
/*
 * This is default barebone for gulp, add your own modifications here
 * It also serves as an example of how to use browser-sync in this environment
 */
var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var reload      = browserSync.reload;

/*
 * src array contains the files which the gulp will be watching
 * Choose your theme over here (twentyfifteen is provided as an example)
 */
var src = {
    scss: 'htdocs/wp-content/themes/twentyfifteen/scss/*.scss',
    css:  'htdocs/wp-content/themes/twentyfifteen/css/',
    php: [
        'htdocs/wp-content/themes/*/*.php',
        'htdocs/wp-content/plugins/*/*.php',
        'htdocs/wp-content/mu-plugins/*/*.php'
    ]
};

// Serve all files through browser-sync
gulp.task('serve', ['sass'], function() {

    // Initialize browsersync
    // Nginx is configured to use any service in port 1337
    // as middleware to WordPress in vagrant environment
    browserSync.init({
        // browsersync with a PHP server
        proxy: "http://localhost:8080",
        port: 1337,
        ui: {
            port: 1338
        },
        notify: true
    });

    // Watch sass files and compile them
    gulp.watch(src.scss, ['sass']);

    // Update the page automatically if php files change
    gulp.watch(src.php).on('change', reload);
});

// Give another name for serve
gulp.task('watch',['serve'], function() {
});

// Compile sass into CSS
gulp.task('sass', function() {
    return gulp.src(src.scss)
        .pipe(sass())
        .pipe(gulp.dest(src.css))
        .pipe(reload({stream: true}));
});

// Default task just compiles everything
// This is run when site is deployed!
gulp.task('default', ['sass'], function() {});
```
