---
layout: page
title: "WordPress Network"
order: 6
---

WordPress Network (aka multisite) is a special setup of WordPress, where one single database and set of files are used to serve multiple WordPress sites. This is useful for example:
- if there is a need to allow admins to use all sites with a single set of credentials and single login
- if the sites are tightly connected, e.g. use the same theme and plugins and those want to be maintained and released in lockstep
- if there is a need to create multiple sites quickly or dynamically that share the baseline code
- if there needs to be multiple WordPress sites at the same domain, eg. example.com/a and example.com/b

One very typical use case is that an international company that is centrally managed has one marketing department managing multiple international sites that all share the same user database, theme and most parts of the plugins or site code. There could be a main site example.com and a site for Finnish markets at example.com/fi and one for German markets at example.com/de and so on.

In many cases when people think about setting up a Network site they realize after some thinking that multiple separate sites is a better idea based on non-technical reasons, for example that each site has a different marketing person handling it or the separate sites have different lifespans and theme/plugin development cycles.

> **Don't try this at home!** Setting up WordPress Network (aka multisite) correctly can be a bit tricky at times. Customers should not attempt to do it themselves but ask Seravo to do it for them. The setup of a Network is included in the plan prices that allow Network setups. All sites running a WordPress Network needs to have prior approval from Seravo so that Seravo's upkeep can be adapted to cover the entire multisite with subsites correctly.

## Subfolder or subdomain

If it is decided that a Network is really the best fit for a new set of sites, then the next decision needs to be if it will have a _subfolder_ structure (e.g. example.com, example.com/a and example.com/b)  or a _subdomain_ structure (e.g. example.com, a.example.com, and b.example.com). This decision is almost impossible to change afterwards once the network has been set up, so it needs to be planned carefully.

Also note that a single WordPress installation can be converted into a Network installation at any time, but once it has it's first subsite created, reverting back to a single WordPress installation is not possible anymore.

## Domain mapping

If the Network is intended to have individual domains for each subsite, then the site structure needs to be of _subdomain_ and a separate domain mapper needs to be installed so subsites work both with their structural address and mapped address.

Example:
- main site example.com
- subsite a.example.com, domain mapping example.net
- subsite b.example.com, domain mapping example.org

It is possible to mix different domains and folder structures and the WordPress Network will initially look like it is working, but later reveal severe bugs like authentication issues and redirect loops. The most robust structure is not to mix different domains and folders, but use a clean setup like the example above.

To list the domains mapped and other information about the WP Network installation, run the command `wp-network-status` or alternatively `wp site list` and `wp mercator mapping list <id>`.

## Subfolder installation in subfolder

It is also possible to install a WordPress Network subfolder installation in a subfolder, e.g. example.com/branches, example.com/branches/a, example.com/branches/b and so on, where the example.com is outside of the Network and the Network main site is example.com/branches, and each 'a' and 'b' are the subsites. This however requires special settings and knowledge to get right, so don't try it yourself.

## Database structure

In a WordPress Network all contents is in the same database. There are a few shared tables like:

- wp_users
- wp_usermeta
- wp_blogs
- wp_sites
- wp_sitemeta
- ...

Each subsite has its own content tables that are prefixed with a number, for example:

- wp_posts
- wp_2_posts
- wp_3_posts
- ...

The `wp_posts` includes all post contents of the main site, while `wp_2_posts` includes all post contents of the first subsite. Run `wp db tables --all-tables` to see a list of all tables in the current WordPress installation.

### Network of networks

Indeed, it is actually technically possible to have a WordPress Super Network that contains multiple Networks. This is the reason the table `wp_sites` only have normally one entry while the subsites are listed in `wp_blogs`. In this terminology _sites_ refer to super networks while _blogs_ refer to the sites in a Network.

## Super admins

On an individual site the admin is still called _admin_. However the user accounts that can make changes to the Network itself and manage all other users are called _super admins_.

## WP-CLI and Networks

The wp-cli has a few extra commands related to Networks. To list all sites one can use `wp site list` and to list all super-admins one can use `wp super-admin list`.

Note that the command `wp plugin list` only apply to the main site when executed. To apply for a subsite, the parameter `--url` needs to be included, e.g `wp plugin list --url=https://example.com/b`.

## SSH/SFTP and database access

Since the WordPress Network is just one big installation with one database and one set of files, it means that anybody with direct database access or SSH/SFTP access to the files can do changes that affect any site in the network.

## Uploads folder

All media files will reside in the folder `wp-content/uploads` otherwise as usual, but each site will have its own subfolder with the site id number, e.g. `wp-content/uploads/2/2019/03/pic.jpg`.

## Themes and plugins

### Themes

A theme installed in a Network can be marked in the Network wp-admin as available to any site, or available only to selected sites. From the site settings each subsite can then choose what available theme to use.

### Plugins

A plugin installed in a Network can be marked active from the settings of each subsite, or they can be marked _network-active_ from the Network wp-admin. That means a subsite must use it and cannot deactivate it even if the admin of that site wanted.

## Local development

The main site of a Network will work out-of-the-box in local development with Vagrant. If the subsites are of the subfolder structure they will also work just fine. However, if the Network is of the subdomain structure, the subdomains will cause extra hoops and loops for the developer to get converted into a form that is routed to the local Vagrant box.

## Installation

Setting up a Network requires special settings in the `wp-config.php` file, potentially the installation of a domain mapper (Seravo prefers [Mercator](https://github.com/humanmade/Mercator) at the moment). In addition the web server needs to have some custom routing (at Seravo we put a `nginx/network.conf` file). In a subdomain installation also preparations regarding HTTPS certificates are needed. Seravo's customers don't need to worry about these as Seravo takes care of them and it is included in the price of the service anyway.

## Note on wp-cli use

Note that all **wp-cli commands acts only on the main WP Network site by default**. For example the command `wp user list` would only list the users of the primary site. To list all users one would need to run `wp user list --network` or to list the users of a specific site `wp user list --url=https://example.com/example1/`.

Always keep this in mind when manipulating a WP Network site from the command line and rember to append `--url=` always when needed. To list all site urls, run `wp site list`.

### Listing active plugins on a Network

Due to the above reason, a simple `wp plugin list` will only show what plugins are **active on the primary site**. Currently [wp-cli](https://wp-cli.org/) does not have any built-in method of listing what plugins are active on what sites. In order to do that, one must install the [WP-CLI Plugin Active on Sites](https://github.com/iandunn/wp-cli-plugin-active-on-sites) extension for wp-cli and run the following commands:

```
$ https://github.com/iandunn/wp-cli-plugin-active-on-sites
$ for p in $(wp plugin list --field=name); do wp plugin active-on-sites $p; done
```

Only uninstall plugins that this listing says that a plugin is not active on any site.

There is[ also a visual plugin for WordPress](https://github.com/Seravo/wp-multisite-plugin-statistics) that can list what plugins are used on what sites.


## Local development with Vagrant and WordPress Network

### Value for DOMAIN_CURRENT_SITE
On the production site the `wp-config.php` file contains the Network address hard coded in the global variable `DOMAIN_CURRENT_SITE`. When doing local development, the value needs to be a local development domain instead. A typical way to solve this is by using a different value for `DOMAIN_CURRENT_SITE` different environments in the `wp-config.php` file:

```
if ( 'development' === getenv('WP_ENV') ) {
  define('DOMAIN_CURRENT_SITE', 'example.local');
} else {
  define( 'DOMAIN_CURRENT_SITE', 'example.com' );
}
```

When using the Seravo WordPress Vagrant box the hard coded string `example.local` can be replaced with `getenv('DEFAULT_DOMAIN')` so the value automatically follows whatever was set in the `config.yml` file as the development site domain address.

### WordPress Network subdomain installation
If you wish to run a WordPress network subdomain installation locally, please be sure to include all subdomains you wish to use in `config.yml` as development domains before running `vagrant up`:
```
...
  development:
    domains:
      - wordpress.local
      - site1.wordpress.local
      - site2.wordpress.local
```
When running the Vagrant box command `wp-pull-production-db`, subdomains are automatically mapped to the local development URL if a subdomain network installation is detected. When using the configuration above, site1.example.com would be searched replaced to site1.wordpress.local. However, custom domain mappings to domains other than subdomains (for instance site1.com instead of site1.example.com) are not handled, and this is something the site developer needs to take care of with custom scripts that do whatever is suitable for the site in question.
