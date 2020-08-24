---
title: "wp-optimize-images"
---


# NAME

wp-optimize-images - manual page for wp-optimize-images git version
fba2a66

# DESCRIPTION

usage: wp-optimize-images \[-h\] \[--version\] \[--enable\]

  - \[--set-max-resolution-width MAX\_RESOLUTION\_WIDTH\]  
    \[--set-max-resolution-height MAX\_RESOLUTION\_HEIGHT\] \[-f\]
    \[--strip-metadata\] \[path\]

Optimize images on a WordPress site. Can be given a path, scans
\*/data/wordpress/htdocs/wp-content/uploads/\* as default. Runs only if
the \*seravo-enable-optimize-images\* value in the database is set to
true. Reduces the resolution of all JPEG files according to maximum
width and height saved in the datadase. Maximum image quality for JPEG
is set to 90. Image quality for PNG files is set to 7. Prints the output
to terminal and */data/log/wpoptimize-images.log*

## positional arguments:

  - path  
    File or directory of images to optimize

## optional arguments:

  - **-h**, **--help**  
    show this help message and exit

  - **--version**  
    show program's version number and exit

  - **--enable**  
    Enable image optimization even if seravo-enableoptimize-images is
    not "on"

  - **--set-max-resolution-width** MAX\_RESOLUTION\_WIDTH  
    Set to override seravo-image-max-resolution-width.

  - **--set-max-resolution-height** MAX\_RESOLUTION\_HEIGHT  
    Set to override seravo-image-max-resolution-height.

  - **-f**, **--force**  
    Force optimization.

  - **--strip-metadata**  
    Remove metadata from images

# SEE ALSO

*jpegoptim*(1), *optipng*(1)
