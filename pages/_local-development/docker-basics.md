---
layout: page
title: "Local development with Docker"
order: 1
summary: "This article describes how to use Seravo's local development environment with Docker"
---

# Local development with Docker 
So far Seravo has offered a local development environment with Vagrant. However, we no longer recommend using that unless you are not able to use Docker. Docker is much more lightweight for your computer hardware and also more secure. Docker was originally made for Linux, but can nowadays be used on almost any device. Docker has its own [documentation](https://docs.docker.com/) and for those who enjoy a clickable user interface, there is also Docker Desktop. Mostly Docker is only a command line tool. 

## Requirements
To use the local development environment, you need to have Docker, Docker Compose and Git installed on your device. You also need to have your WordPress site in Git version control for the commands to work properly. 

[Install Docker and Docker Compose](https://docs.docker.com/manuals/)

[Install Git](https://github.com/git-guides/install-git)

[Clone your site to your local device](https://github.com/git-guides/git-clone)

    $ git clone https://github.com/examplerepository/example.git

### Relevant files and their contents
There are certain files in the Seravo project template that have something to do with local development. Here is a short explanation of each.

#### docker-compose.yml
This is related to Docker help tool Docker Compose, as the name suggests. This file defines a service called wordpress, and then a container with a certain name is created in it. This container then tries to read the environmental variable called SITE. If it is unable to find the variable, it will default to use "wordpress". The next line "hostname" does the same. After that the Docker image in use is defined, and then ports that the environment can be accessed through. Volumes defines which directories from the local system we want to bring inside the container. At the end of the file two environmental variables are declared: WP_USER_UID and DEBUG. The former has to do with user rights and the latter, default as "true", makes logging more extensive. 
    
    services:
      wordpress:
        container_name: ${SITE:-wordpress}
        hostname: ${SITE:-wordpress}
        image: docker.io/seravo/wordpress:nightly
        ports:
        - 80
        - 443
        - 22
        - 3306
        - 1337
        - 1338
        - 8080
        - 9000
        volumes:
        - wordpress:/data
        - .:/data/wordpress
        environment:
        #- WP_USER_UID=${WP_USER_UID:-1000}
        - DEBUG="true"

#### config-sample.yml and config.yml
Config-sample.yml is the base version of config.yml, and if you want to customize your own config.yml or don't have one yet you can just copy this to a new config.yml file. So even if you customize config.yml, config-sample.yml still exists if you need to see what the original was like. This file defines URL:s such as where content is pulled from and what is the development environment's domain. Note that if you want to be able to use your local site with a browser, you may need to set the line "avahi: true" uncommented. 

    ###
    # Configuration for development environment (Vagrant and Docker)
    ###
    name: wordpress
    #production:
      # This is used to automatically fetch data from a staging/production environment
      #domain: example.seravo.com
      #ssh_port: 12345
      #url: https://example.seravo.com
    development:
      # Domains are automatically mapped to Vagrant with /etc/hosts modifications or Avahi
      domains:
        - wordpress.local
      # Allow Vagrant to expose .local domains on the local network (outside of laptop)
      #avahi: true
      # If you want to automatically pull stuff from production use 'always' or set
      # to 'never' to just silence the 'yes/no' question during 'vagrant up'.
      #pull_production_db: always
      #pull_production_plugins: always
      #pull_production_themes: always


## Starting and using the environment
Move to the project directory where you have the site files. Here you can start the docker container. There are two options for starting the container: normal or detached. Difference between these is that without using detach option "-d" Docker will reserve the current terminal for printing logs and you cannot run any commands there.  

    $ docker-compose up / docker-compose up -d

If the container was started succesfully you will see this message in the log:

    wordpress    | Success!
    wordpress    | Visit your site at https://wordpress.local/
    wordpress    | To enter the development environment simply run in the project directory: 
    wordpress    |   ssh wordpress.local -F .vagrant/ssh/config
    wordpress    | You may also want to execute 'wp-development-up'

If everything works correctly, you should be able to open that link in the browser and see the local website there. It will complain about a certificate error, but that can be ignored and you can just click the "Trust this site" link in your browser. The reason for the certificate error is that the local site uses a self-signed certificate which the browser does not trust. This does not affect the production site, which of course uses our Let's Encrypt certificate.

You can check all the running containers with

    $ docker-compose ps
In Seravo environment this usually only shows one container, even though there are several services inside that container. And if you add -a to this, it will also show containers that have been turned off. This is useful, if there has been a problem with the container start where the container has been created but it has been shut down for some reason.

You can check the logs with

    $ docker-compose logs
Of course, if you ran the docker-compose up without -d, then you have the one terminal reserved for logs anyway.

And finally, to turn off the container(s), run

    $ docker-compose down
If you want to change the container name and the domain it uses, you need to make changes to both config.yml and docker-compose.yml. In config.yml you need to modify the lines "name" and the domain under the line "domains":

    name: wordpress
    development:
      domains: 
        -wordpress.local

And in docker-compose.yml you need to modify the lines container_name and hostname.

    services:
      wordpress:
        container_name: ${SITE:-wordpress}
        hostname: ${SITE:-wordpress}
So you just change the word "wordpress" to whatever you want the container to be called. If all of these in both files are not changed, it will not work properly. Also remember that you have to start a new container with the new name, so stop the container before making changes and then start it again for the change to show. You also may need to run $ wp search-replace to change the site's address.

### Accessing the container
Note that you cannot access a container through SSH if it is not up and running. So first you need to start the container, and only then connect to it through SSH. As seen on the printed message, you can connect to the started container with SSH by running this:

    $ ssh wordpress.local -F .vagrant/ssh/config

Then when you are inside the container you can run normal wp-cli commands, including most of our own custom commands. The log suggested also running the command $wp-development-up. What this does, is import themes, plugins and database, if you have configured settings for your production site in the config.yml file.

You can also use docker-compose exec to get inside the container as root-user. This is handy if the container is somehow malfunctioning. You need to give the command the container name and a command to run inside the container.

## Docker images that Seravo offers
The different Docker images that Seravo offers can be found at Docker Hub which is place to share images publicly. "Tags" are the different images, and they can be found [here](https://hub.docker.com/r/seravo/wordpress/tags)

The default image in our project template is nightly. This is defined in docker-compose.yml.

#### ci
Can be used if you want to create your own automatic tests for your site.

#### development
This is a stable version of all of our software.

#### nightly
A new version generated every night, contains the newest versions of everything.

#### latest
This works if no tag for the image is given, this should be the same as development image. Should reduce bugs if the tag is missing for some reason.

#### other images
There are also a couple of older images in the Hub. If you for some reason absolutely want to use an older version of Linux, there is an image for that. These can also be used in troubleshooting, if it seems that some change in the image has affected the local environment.

## Troubleshooting
If there are problems with the local environment, here are some things you can do.

#### What do the local config.yml and docker-compose.yml look like?
Compare to the ones in our project template. For example, if the site name is defined differently in these files, the site might not work properly. If avahi is not defined to "true", the wordpress.local will not work on your browser.

#### Problems with pulling production data
Note that the pull commands will not return much if your site is not in version control (git). You also need to define the production site's info correctly on the config.yml file.

#### Check the used image
Which image is being used? This can be found and changed in the docker-compose.yml file. Nightly and development images should work best. Try running $ docker-compose pull to get the latest version of the image. You can also try changing the image to see if that solves the problem.

### Commands
The most useful commands for troubleshooting are docker-compose logs, docker-compose ps, docker-compose exec and docker-compose pull.

#### docker-compose logs
View log output from container(s).

#### docker-compose ps
List all currently running containers. Add -a or --all to display also stopped containers.

#### docker-compose exec
Execute a specific command in a running container.

#### docker-compose pull
Pull the latest version of the used image.

List of all available docker-compose commands can be found [here](https://docs.docker.com/compose/reference/).
