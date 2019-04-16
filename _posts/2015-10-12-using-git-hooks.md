---
layout: page
title: "Using Git hooks"
category: development
date: 2015-10-12 11:24:27
order: 5
---

## Git hooks

Basically they are scripts which allow you to run custom actions automatically on every git commit.
They exists in your repository `.git/hooks/` and are not copied when pulling/pushing.

Git hooks are explained really well in [git documentation](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks). Example hooks can be found on a Linux system at the path `/usr/share/git-core/templates/hooks/`.

Basically the hooks are just shell scripts and it should be fairly easy for any developer to customize them.

### During development: pre-commit hook

The pre-commit hook script is run by `git` on every commit attempt. If the hook returns any exit code whatsoever, the commit is aborted and the developer alerted that they need to fix their code before a commit can be accepted.

The purpose of this hooks is to help with quality control, preventing developers from committing code that has clear mistakes in them.

Our WordPress project template contains one custom git hook example you can find in [scripts/hooks/pre-commit](https://github.com/Seravo/wordpress/blob/master/scripts/hooks/pre-commit).

By default our example pre-commit hooks script runs `php -l` to check if there are any syntax errors in the modified PHP files, and then it runs the [Codeception tests]({{ site.baseurl }}{% post_url 2018-09-21-ng-integration-tests %}) to check that the integration tests pass.

#### How to temporarily skip the pre-commit hook

You can use **-n** flag to skip hooks in case you are sure you want to make a commit and specifically want to ignore the result of any quality assurance and testing done by the git pre-commit hook.

```bash
$ git commit -n -m "commit message"
```
### During deployment: post-receive hook

When a developer runs `git push production` or similar to push the code to the remote server, the remote server will trigger the hook `.git/hooks/post-receive`. At Seravo this hooks is preinstalled and contains the following:

```
#!/bin/bash
##
# This is run after successful push to this repo
# Useful for automating grunt work using local development
##

##
# This script can be called from anywhere so it's good to be in the correct location
# This can also be called in .git/hooks dir and we need to get into project root
##
cd "$( dirname "${BASH_SOURCE[0]}" )"/../..

# Hack: Somehow this script won't understand that git is in current directory
GIT_DIR="$(pwd)/.git"

# Loop through all changed files
changed_files=$(git diff --name-only --diff-filter=ACM HEAD HEAD^)

# Check files which have triggers
while read -r line; do
    if [ "$line" = "composer.json" ] || [ "$line" = "composer.lock" ]; then
      COMPOSER_CHANGED=true
    elif [ "$line" = "nginx/*.conf" ]; then
      NGINX_CHANGED=true
    fi
done <<< "$changed_files"

# Do stuff with the triggers
if $COMPOSER_CHANGED; then
  echo "Seravo: composer.json was updated, installing..."
  composer install --no-dev
fi

if $NGINX_CHANGED; then
  echo "Seravo: Nginx configs were changed, reloading nginx..."
  wp-restart-nginx
fi
```

This script will see if the `composer.json` or any files in `nginx/*.conf` were modified in the commit, and if that was the case it will run `composer install` or reload Nginx.

Note that while there is a post-receive hook on the server, it's not included in the project template as it's useless (and potentially even harmful) to have in your local copy. For details see [Deploy using git]({{ site.baseurl }}{% post_url 2015-10-12-deploy-using-git %}).

## Testing git hooks

Since the git hooks are just regular scripts, you can easily test them by simply running them e.g. like this:

```
$ /data/wordpress/.git/hooks/post-receive
Seravo: composer.json was updated, installing...
Loading composer repositories with package information
Installing dependencies from lock file
Nothing to install or update
Generating autoload files
> WordPress\Installer::symlinkWPContent
Seravo: Nginx configs were changed, reloading nginx...
testing nginx configuration...
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
Nginx restarted!
```

One common reason for scripts to fail is the lack of the executable bit. That is easily fixed by `chmod +x /data/wordpress/.git/hooks/post-receive`.
