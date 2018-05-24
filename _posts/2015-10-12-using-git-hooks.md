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

## What's included?
Our WordPress project template contains one custom git hook: `pre-commit`.

By default it runs your [Rspec tests]({{ site.baseurl }}{% post_url 2015-10-11-integration-tests %}) before a new commit is allowed.

### Server hooks
Note that on the server we also have a post-receive hook, but it's not included in the project template as it's useless (and potentially even harmful) to have in your local copy. For details see [Deploy using git]({{ site.baseurl }}{% post_url 2015-10-12-deploy-using-git %}).

## Customizing
You can customize the tests by editing `scripts/run-tests`. It's in bash but you can use any language you wish. The only important thing is the return value of your script. If it returns `true` the git commit will continue and a `false` will reject your commit.

## Skipping pre-commit hook
You can use **-n** flag to skip hooks.

```bash
$ git commit -n -m "commit message"
```
