---
layout: page
title: "Serve WebP images"
order: 8
---
One way to serve images in WebP format is by using the [WebP Converter for Media](https://wordpress.org/plugins/webp-converter-for-media) plugin.

In addition to installing and activating the plugin some additional configuration for NGINX is required. Original configuration can be found [here](https://wordpress.org/plugins/webp-converter-for-media/#configuration%20for%20nginx).

Create a file `webp.conf` inside the folder `/data/wordpress/nginx` and copy this configuration inside it:

```php
# BEGIN Converter for Media
set $ext_avif ".avif";
if ($http_accept !~* "image/avif") {
    set $ext_avif "";
}

set $ext_webp ".webp";
if ($http_accept !~* "image/webp") {
    set $ext_webp "";
}

location ~ /wp-content/(?<path>.+)\.(?<ext>jpe?g|png|gif|webp)$ {
    add_header Vary Accept;
    add_header Cache-Control "private";
    expires 365d;
    try_files
        /wp-content/uploads-webpc/$path.$ext$ext_avif
        /wp-content/uploads-webpc/$path.$ext$ext_webp
        $uri =404;
}
# END Converter for Media
```

> **REMEMBER!** NGINX has to be restarted after adding a config file. Run command `wp-restart-nginx` to restart.

You can now continue with the plugin setup.
