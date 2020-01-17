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

The `pre-commit` hook script is run by `git` on every commit attempt. If the hook returns any exit code whatsoever, the commit is aborted and the developer alerted that they need to fix their code before a commit can be accepted.

The purpose of this hooks is to help with quality control, preventing developers from committing code that has clear mistakes in them.

Our WordPress project template contains one custom git hook example you can find in [scripts/git-hooks/pre-commit](https://github.com/Seravo/wordpress/tree/master/scripts/git-hooks).

By default our example pre-commit hooks script runs `php -l` to check if there are any syntax errors in the modified PHP files, and then it runs the [Codeception tests]({{ site.baseurl }}{% post_url 2018-09-21-ng-integration-tests %}) to check that the integration tests pass.

#### How to temporarily skip the pre-commit hook

You can use **-n** flag to skip hooks in case you are sure you want to make a commit and specifically want to ignore the result of any quality assurance and testing done by the git pre-commit hook.

```bash
$ git commit -n -m "commit message"
```
### During deployment: post-receive hook

When a developer runs `git push production` or similar to push the code to the remote server, the remote server will trigger the hook `.git/hooks/post-receive`. At Seravo the [post-receive hook is preinstalled](https://github.com/Seravo/wordpress/tree/master/scripts/git-hooks) for convenience, but developers are naturally free to remove it if it is not needed.

This script will see if the `composer.json` or any files in `nginx/*.conf` were modified in the commit, and if that was the case it will run `composer install` or reload Nginx. Feel free to extend the script to run any asset builder (npm, yarn etc) if used in the project.

Note that while there is a post-receive hook on the server, it's not installed on local development environments, as it's useless (and potentially even harmful). Even if the script is in version control, it is only active if there is a link from `.git/hooks/post-receive -> scripts/git-hooks/post-receive`.

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

One common reason for scripts to fail is the lack of the executable bit. That is easily fixed by `chmod +x /data/wordpress/.git/hooks/post-receive` or if it is a link, with `chmod +x /data/wordpress/scripts/git-hooks/post-receive`.
