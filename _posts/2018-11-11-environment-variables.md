---
layout: page
title: "Environment variables"
category: development
date: 2018-11-11 21:52:00
order: 4
---

## System environment variables at Seravo

In all Seravo's environments (production, staging/testing shadow, local development etc) there are many environment variables defined. Examples include:


### WP_ENV

The environment variable `WP_ENV` always contains the environment name. When code is running on the live production site it always sees a `WP_ENV` with the value `production`. Different testing environments have different names, e.g. `staging` and `development`.

### CONTAINER

This is the name of a particular environment instance. For example `example_1ab2c3`. This may change over time. Don't write any logic in your WordPress code based on this.

### DEFAULT_DOMAIN

This is the internal domain name given to a live production site given by Seravo. An example could be example.fi.seravo.com. It is used in cases when the real external domain (e.g. example.com) has not yet been registered, does not point to the site or might have some other issue and does not work.

### REDIS_HOST and REDIS_PORT

These always contain the Redis server address and port.

### DB_HOST, DB_NAME, DB_USER, DB_PASSWORD

These always contain the database credentials. Please rely on these and the database connection will always work even when you have different passwords in production and in testing. Avoid from hardcoding any passwords or server addresses in your code.

### AUTH_KEY, LOGGED_IN_*, NONCE_*, SECURE_AUTH_*

Each of these contain a unique key (e.g. `xifablhk84nimz4k6p71b5b2hvuq0js66m9db7vcfthdxa4bvtumfykirwfq342q`) which is different from environment to environment, but always the same inside the same environment. Using these constants makes the source code of your WordPress site more secure, since it will be void of any secrets. Below is an example of how the `wp-config.php` at any site at Seravo looks like:

```
/**
 * Authentication Unique Keys and Salts
 * You can find them by running $ wp-list-env
 */
define('AUTH_KEY',         getenv('AUTH_KEY'));
define('SECURE_AUTH_KEY',  getenv('SECURE_AUTH_KEY'));
define('LOGGED_IN_KEY',    getenv('LOGGED_IN_KEY'));
define('NONCE_KEY',        getenv('NONCE_KEY'));
define('AUTH_SALT',        getenv('AUTH_SALT'));
define('SECURE_AUTH_SALT', getenv('SECURE_AUTH_SALT'));
define('LOGGED_IN_SALT',   getenv('LOGGED_IN_SALT'));
define('NONCE_SALT',       getenv('NONCE_SALT'));
```

## Using Dotenv

The `wp-config.php` file uses [Dotenv](https://github.com/vlucas/phpdotenv) by default which enables you to create a file called `.env` in the root of your project to override default environment variables.

Example:

```bash
$ cat .env.development
# Run 'ln -s .env.development .env' in project root to activate this
WP_TEST_URL=https://example.dev
DOMAIN_CURRENT_SITE=example.dev
NOBLOGREDIRECT=https://example.dev
COOKIE_DOMAIN=.example.dev

$ ll .env
lrwxrwxrwx 1 otto otto .env -> .env.development
```

You can have template files like `.env.development` tracked in version control, and then make a location-specific symbolic link from `.env` to the correct file. By default the `.env` file is and should be ignored by git via gitignore.

## Note on Dotenv version 5.0.0

With the latest [version 5.0.0 the syntax of Dotenv changed again](https://github.com/Seravo/wordpress/commit/88d3a0201da14b935f50f27ba49f1aeb51ae726c). In new instances of `wp-config.php` you will find lines like:
```
$dotenv = Dotenv\Dotenv::createUnsafeImmutable($root_dir);
$dotenv->load();
```

The `Unsafe` in the function name looks bad, but indeed necessary for `getenv('NAME')` to work in WordPress/PHP.

## Note on Dotenv version 2.4.0

In the [version 2.4.0 the syntax of Dotenv changed](https://github.com/Seravo/wordpress/commit/f28fd089197c7e09ce44a78e74c1cf59d05385e8). In new instances of `wp-config.php` you will find lines like:
```
$dotenv = new Dotenv\Dotenv($root_dir);
$dotenv->overload();
```

The older syntax was:
```
Dotenv::makeMutable();
Dotenv::load($root_dir);
```

The version of Dotenv on your site (and syntax in your `wp-config.php`) is what was at the time when the site was created. If you later run `composer update` and thus update Dotenv to version &gt; 2.4.0, you need to update the lines in your `wp-config.php` manually, otherwise your WordPress will just display a blank page and your `/data/log/php-error.log` will have fatal error messages about Dotenv.

For more information, see the [Dotenv UPGRADING documentation](https://github.com/vlucas/phpdotenv/blob/master/UPGRADING.md) that lists major changes across all versions.
