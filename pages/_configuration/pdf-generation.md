---
layout: page
title: "Server-side PDF printing"
order: 9
---

> **Please contribute!** This document is a stub. If you have recently implemented a PDF generator that works well with modern WordPress in Seravo's environment, please contribute to this page via the Github link in top right corner.

Traditionally developers have generated PDF files out of HTML web pages on the server side using one of the tools below. Unfortunately, none of them meet modern standards anymore.

* [PHP-DOMPDF](http://dompdf.github.io/): Works only with PHP 5. Is not maintained anymore.
* PHP-FPDF: Works only with PHP 5 and is not maintained anymore. Anyway needed Apache and suexec to run, so was never a good option.
* wkhtmltopdf: Uses webkit for rendering and thus does not render correctly all modern websites. Needs X virtual framebuffer which is inconvenient server-side.

For modern WordPress sites there are three recommended options:
1. Render PDF files client-side using JavaScript and/or print CSS
2. Render PDF files server-side using the headless Chrome available in Seravo's environments
3. Use an custom WordPress plugins for the purpose (e.g. [Waterwoo](https://www.waterwoo.me/) for watermarks) or external service via API requests

Also note, that since Seravo's server have NodeJS available, any of the NodeJS server-side JavaScript tools out there are also potential options.

## WordPress Media Library PDF thumbnails

The standard WordPress media library automatically generates thumbnail images of the PDF files uploaded there. Unlike the above, the media thumbnails are not a HTML-to-PDF generation but rather a PDF-to-PNG generating using the GraphicsMagick library on the server and in PHP. Seravo's servers support this feature out-of-the-box, just like our systems support every single other standard WordPress feature.
