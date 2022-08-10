---
layout: page
title: "Composer - Plugins & Themes"
order: 3
---

## What is it?
> Composer is a dependency manager for PHP that has been gaining popularity lately. Your first question is most likely “what is a dependency manager and why do I need one?”. Almost any code you write probably ends up depending on 3rd party libraries. All of these libraries (projects, frameworks, files, etc) become dependencies of your project. Composer lets you declare the dependencies for a project and it will install and manage them.
>
> Source: [roots.io](https://roots.io/using-composer-with-wordpress/)

## How to use Composer with WordPress

### Example
Let's look at simplified version of our `composer.json` as an example:

```json
{
  "repositories": [
    {
      "type": "composer",
      "url": "http://wpackagist.org"
    }
  ],
  "require": {
    "php": ">=7.2",
    "johnpbloch/wordpress-core-installer": "^1.0",
    "johnpbloch/wordpress-core": "^5.0",
    "composer/installers": "^1.0",
    "koodimonni/composer-dropin-installer": "^1.0",
    "vlucas/phpdotenv": "^2.4",

    "seravo/seravo-plugin": "*",

    "wpackagist-plugin/auto-post-thumbnail": "*",
    "wpackagist-plugin/google-analytics-dashboard-for-wp": "*",

    "wpackagist-theme/twentynineteen": "*"
  },

  "extra": {
    "installer-paths": {
      "htdocs/wp-content/plugins/{$name}/": ["type:wordpress-plugin"],
      "htdocs/wp-content/mu-plugins/{$name}/": ["type:wordpress-muplugin"],
      "htdocs/wp-content/themes/{$name}": ["type:wordpress-theme"]
    },
    "wordpress-install-dir": "htdocs/wordpress"
  }
}
```

### Explanation
#### Repositories section:
```json
{
  "repositories": [
    {
      "type": "composer",
      "url": "http://wpackagist.org"
    }
  ]
}
```
**Repositories** section tells Composer where to look for your packages. In order for Composer to find your beloved WordPress plugins and themes you'll need to point it to [wpackagist.org](http://wpackagist.org), which is a mirror of all the plugins and themes that you can download from [wordpress.org](http://wordpress.org/plugins/). Here you can add any custom repositories you may have, but for WordPress you'll need to use wpackagist.

#### Require section:
```json
{
  "require": {
    "php": ">=7.2",
    "johnpbloch/wordpress-core-installer": "^1.0",
    "johnpbloch/wordpress-core": "^5.0",
    "composer/installers": "^1.0",
    "koodimonni/composer-dropin-installer": "^1.0",
    "vlucas/phpdotenv": "^2.4",

    "seravo/seravo-plugin": "*",

    "wpackagist-plugin/auto-post-thumbnail": "*",
    "wpackagist-plugin/google-analytics-dashboard-for-wp": "*",

    "wpackagist-theme/twentynineteen": "*"
  },
}
```
**Require** section tells Composer the minimum PHP version needed and all the packages to install.

`"johnpbloch/wordpress": "*"` means newest available version of WordPress.

`"wpackagist-plugin/wordpress-seo": "*"` means that we need plugin [WordPress Seo](http://wordpress.org/plugins/wordpress-seo)

`"wpackagist-theme/twentyfifteen": "*"` means that we need theme [Twentyfifteen](http://wordpress.org/themes/twentyfifteen)

#### Extra section:
```json
{
  "extra": {
    "installer-paths": {
      "htdocs/wp-content/plugins/{$name}/": ["type:wordpress-plugin"],
      "htdocs/wp-content/mu-plugins/{$name}/": ["type:wordpress-muplugin"],
      "htdocs/wp-content/themes/{$name}": ["type:wordpress-theme"]
    },
    "wordpress-install-dir": "htdocs/wordpress"
  }
}
```
By default Composer installs everything to **vendor** directory in the root of your project. Luckily for us wpackagist uses a clever plugin [composer/installers](https://packagist.org/packages/composer/installers) that allows us to have custom installation paths. In **Extra** section we can define installation paths for different types of packages.

## Adding your own plugins and themes
The best way to develop custom plugins and themes is to add them into their own repositories and install them by Composer.

You can do this by adding a `composer.json` file for into your plugin/theme repo:

```json
{
  "name": "your-name/custom-plugin",
  "type": "wordpress-plugin",
  "license": "GPLv3",
  "description": "Plugin description",
  "homepage": "https://github.com/your-name/custom-plugin"
}
```

...and then requiring it in your project like this:

```json
{
  "repositories": [
    {
        "type": "vcs",
        "url": "https://github.com/your-name/custom-plugin.git"
    }
  ],
  "require": {
      "your-name/custom-plugin": "*"
  }
}
```

This way you can use plugins and themes from Github or Bitbucket.

## Paid WordPress plugins and Composer

By default Composer only fetches modules that are publicly available on Github. For paid WordPress plugins that are not freely available, there are basically two alternative approaches. Either you can include them in our project repository and distribute them together with the project code, or you can get a paid account from [Packagist.com](https://packagist.com/) that includes the ability to have [private Composer packages](https://packagist.com/features/private-vcs-packages). It is also possible to have [private repositories for Composer with Satis](https://getcomposer.org/doc/articles/handling-private-packages-with-satis.md).

## More information

You can find more documentation on [getcomposer.org](https://getcomposer.org/)
