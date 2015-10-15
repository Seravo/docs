# Developer Documentation for WP-palvelu.fi
Read the documentation here: [https://docs.wp-palvelu.fi](https://docs.wp-palvelu.fi)

This is just the jekyll code which generates the documentation.

## Using jekyll with this repo

You can add new pages by:

For example and SSH page to get started
```bash
ruby bin/jekyll-page "Configure SSH" get-started
```

## Configuration
This site uses nginx proxy to achieve custom https. Use this template:

```nginx
##
# Rewrite https://docs.wp-palvelu.fi -> https://wp-palvelu.github.io/developer-documentation/
#
# Note: If the repo name will ever change it will break this rewrite
##


# Force HTTPS on http port
server {
    listen      80;
    listen      [::]:80;

    server_name docs.wp-palvelu.fi *.docs.wp-palvelu.fi documents.wp-palvelu.fi *.documents.wp-palvelu.fi;

    location / {
      return 301 https://docs.wp-palvelu.fi$request_uri;
    }
}

# Do the rewrite to Github Pages
server {
    listen [::]:443 ssl spdy;
    listen 443 ssl spdy;

    #Advertise SPDY support
    add_header Alternate-Protocol 443:spdy/3;
    spdy_headers_comp 5;

    server_name docs.wp-palvelu.fi *.docs.wp-palvelu.fi documents.wp-palvelu.fi *.documents.wp-palvelu.fi;

    ssl on;

    ##
    # Rewrite all requests into https://wp-palvelu.github.io/developer-documentation/
    #
    # Github doesn't have ssl certificates for custom domains
    # We use our ssl and rewrite all traffic to github ssl
    ##
    location / {
      rewrite ^/ /developer-documentation$request_uri break;
      proxy_pass              http://wp-palvelu.github.io;
      proxy_redirect          default;
      proxy_buffering         off;
      proxy_set_header        Host                    'wp-palvelu.github.io';
      proxy_set_header        X-Real-IP               $remote_addr;
      proxy_set_header        X-Forwarded-For         $proxy_add_x_forwarded_for;
      proxy_set_header        X-Forwarded-Protocol    $scheme;
  }
}
```

## Source
This is based on template: http://bruth.github.io/jekyll-docs-template
