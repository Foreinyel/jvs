# jvs

`jvs` is a front-end project management tools. It helps you to:

- quick open project with vscode

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
