# clear-branches

Productive and easy way to clear your local git branches

## Getting started

### Overview

It's recommended for you who:

- Usually struggle in clearing your local git branches.
- Anyone that doesn't have the habit of deleting the branches constantly and gets crazy managing a lot of branches.
- Prefer using a terminal rather than a Git GUI Client.

### Motivation

I implemented this code once ago, as a tiny and ugly script only to help me to be more productive. And I realized that some colleagues were looking for something like this and I've published it to be available to anyone else to use and contribute.

### Requirement

Recommended node version equal to or greater than `v16`

### Quick start

You don't need to install it globally, if the idea is to use it sometimes, you can just execute it into your git project, so that you will execute the latest stable version.

```shell
$ npx clear-branches
```

Or install it on your machine:

**yarn:**

```shell
$ yarn global add clear-branches
```

**npm:**

```shell
$ npm i -g clear-branches
```

If you're using nvm to manage node versions, pay attention to the node version you're using to create the alias in your bash profile:

```shell
alias clear-branches="node ~/.nvm/versions/node/v19.3.0/lib/node_modules/clear-branches"
```

Creating a dynamic alias that will execute from the current node version forces the user to be in the same version that **clear-branches** was installed.

```shell
alias clear-branches="node $(npm root --global)/clear-branches"
```

**output**

Now **clear-branches** is executable anywhere you want, if you try into your project you will see the list of branches it will delete and a confirmation message:

```shell
$ clear-branches
  feat/component
  feat/feature
  fix/functions
? Are you sure you want to delete listed branches above? › (y/N)
```

## Advanced options

Considering a project with these branches:

```
  feat/component
  feat/feature
  fix/functions
  main
  release
```

### clear-branches --force=\<branch>[,\<branch>]

It force ignored branches by default to be considered to clear.

By default, **clear-branches** ignores these branches.

```
  main
  master
  release
  develop
```

Using `clear-branches --force=<branch>[,<branch>],` you will be able not to ignore any of these branches.

I.e.:

```shell
$ clear-branches --force=main
  feat/component
  feat/feature
  fix/functions
  main  # <-- now main is in the list to deleted
? Are you sure you want to delete listed branches above? › (y/N)
```

### clear-branches --ignore=\<branch>[,\<branch>]

It ignores the branches you don't want to delete.

I.e.:

```shell
$ clear-branches --ignores=feat/component,feat/feature
  fix/functions
? Are you sure you want to delete listed branches above? › (y/N)
```

_In this example, `feat/component` and `feat/feature` won't be deleted._

### clear-branches --ignore-pattern=<pattern>

It ignores all branches that match a regex.

I.e.:

```shell
$ clear-branches --ignores=feat\/\\w+
  fix/functions
? Are you sure you want to delete listed branches above? › (y/N)
```

\_As both `feat/component` and `feat/feature` match the `feat\/\\w+` regex, they won't be deleted.

> It's needed to escape if you need to use `\`, like `\\w+`

### clear-branches -i, --interactive

With this option, you can select the branch you want to delete.

I.e.:

```shell
$ clear-branches -i --force=release,main

  Choose the branches you want to delete:

  [x] feat/component
  [ ] feat/feature
  [ ] fix/functions
  [ ] release
  [ ] main
```

After pressing Enter:

```shell
$ clear-branches -i --force=release,main

  Choose the branches you want to delete:

  [x] feat/component
  [ ] feat/feature
  [ ] fix/functions
  [ ] release
  [ ] main

  feat/component
? Are you sure you want to delete listed branches above? › (y/N)
```

## Contributing

### Cloning and running

### Testing

### Architecture

### Issues

To comfortable start contributing to this project, it is encouraged you go for this list of good start issues:

- [Good first issues](https://github.com/jmlavoier/clear-branches/labels/good%20first%20issue)

More labels

- [Enhancements](https://github.com/jmlavoier/clear-branches/labels/enhancement)
- [Bugs](https://github.com/jmlavoier/clear-branches/labels/bug)

## Contributors

- https://github.com/jmlavoier
