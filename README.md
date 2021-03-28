# jvs

`jvs` is a front-end project management tools. It helps you to:

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
