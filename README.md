# jvs

`jvs` is a front-end project management tools. Mention that most of the Commands works well on Mac, Unix-Like systems, except on Windows. We will support win32 in the future.
It helps you to:

- quick open project with vscode
- enter any project directly

## Install

```console
npm install jvs -g
```

## Usage

### add workspace

```console
cd [path_to_workspace]
jvs set .
```

or

```console
jvs set -w [path_to_workspace]
```

### add project

```console
cd [path_to_project]
jvs set -p .
```

or

```console
jvs set -p [path_to_project]
```

### list workspaces and projects

```console
jvs ls
jvs ls -w
jvs ls -p
jvs ls [name] // filter results by name
```

### open project with vscode

You can specify the fullname, path to the command. Also, you can enter part of the fullname.

```console
jvs code [name]
```

### fly to project path in terminal

`jvs` provides hot commands for you to fly to any paths of projects, instead of typing `cd [long_fuzzy_path_to_project]`.

First, you should add workspace and projects to `jvs`.

Then, run `jvs hot` to add hot commands to PATH.

At last, reopen Terminal or refresh PATH to active hot commands

```console
jvs hot
```

### google anything

You can now google on Terminal, just type `jvs google [something]`, and it will open `google.com` with default web browser and display with searched content.

```console
jvs google [something]
```

### open whatever

`jvs` dose a little improvements on command `open`, allows you to set short-cut for anything. It means you don't have to type the looooooong commands again:

for the first time, open google with safari, add `-s google` to save this command as `google`:

```console
jvs open 'http://google.com' -a 'safari' -s google
```

for the rest of your life, just run `jvs open google`:

```console
jvs open google
```

### git solve conflicts

`jvs` helps you to automaticly create a new branch based on target branch and a pull request from source branch.

```console
jvs sc master feature1
```
`jvs` will create a new branch named `merge_feature1_into_master_***` based on master, automaticly pull request from feature1.

### git remove local branches

`jvs` helps you to select multi local branches and delete them.

```console
jvs rb
```
