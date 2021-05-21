---
layout: page
title: "Serve WebP images"
order: 11
---
One way to serve images in WebP format is by using the [WebP Converter for Media](https://wordpress.org/plugins/webp-converter-for-media) plugin.

In addition to installing and activating the plugin some additional configuration for NGINX is required.

Create a file `webp.conf` inside the folder `/data/wordpress/nginx` and copy this configuration inside it:

```php
# NGINX config for WebP Converter for media
# https://wordpress.org/plugins/webp-converter-for-media/
location ~ /wp-content/(?<path>.+)\.(?<ext>jpe?g|png|gif)$ {
  if ($http_accept !~* "image/webp") {
    break;
  }
  add_header Vary Accept;
  expires 365d;
  try_files /wp-content/uploads-webpc/$path.$ext.webp $uri =404;
}
```

> **REMEMBER!** NGINX has to be restarted after adding a config file. Run command `wp-restart-nginx` to restart.

You can now continue with the plugin setup.
