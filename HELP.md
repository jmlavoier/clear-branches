# Options

## default

```shell
$ clear-branches

* feat/current
  feat/bla
  fix/component

  Are you sure you want to delete these branches? [Y, n]
```

## force

```shell
$ clear-branches -c, --force main,master

* feat/current
  feat/bla
  fix/component
  main
  master

  Are you sure you want to delete these branches? [Y, n]
```

## ignore

```shell
$ clear-branches --ignore=feat/current

  feat/bla
  fix/component
  main
  master

  Are you sure you want to delete these branches? [Y, n]
```

## ignore pattern

```shell
$ clear-branches --ignore-pattern=/feat\/\w+/g

  fix/component
  main
  master

  Are you sure you want to delete these branches? [Y, n]
```

## interactive

```shell
$ clear-branches -i, --interactive

Select the branches you want to delete:

[ ] feat/current
[ ] feat/bla
[ ] fix/component
```
