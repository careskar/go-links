# Go-links

Simple redirect service for mapping short commands to URLs.

Runs a Node.js server with express, supporting the possibility to write `go/<command>` in your browser to open URLs connected to your pre-defined commands.

## Commands

Commands are specified as a JSON map in the following format:

```
{
  "<command-1>": "<url-1>",
  "<command-2>": "<url-2>",
  ...
  "<command-n>": "<url-n>"
}
```

Example:

```json
{
  "google": "www.google.com",
  "fb": "www.facebook.com",
  "tw": "www.twitter.com",
  "twitter": "www.twitter.com"
}
```

Entering the command `go/google` in your browser will then redirect to `www.facebook.com`. Entering the command `go/fb` in your browser will then redirect to `www.facebook.com`. Entering the command `go/tw` in your browser will redirect to `www.twitter.com`. Entering the command `go/twitter` in your browser will also redirect to `www.twitter.com`.

### List commands

Entering `go/commands` will return your commands JSON file.

### Unknown commands

If you're entering a command which has not been specified in your `commands.json` file, you'll see a lean HTML page with an error message and a list all available commands.

## Modify your 'hosts' file

To get `go/<command>` to work on your computer you'll need to modify your hosts file pointing 'go' to 127.0.0.1:

```bash
# /etc/hosts
go 127.0.0.1
```

## Start the service

By default, the node server will try to run on port 80 in order to avoid specifying port number after 'go'. To allow the node server to run on port 80, you'd most likely need to start it with `sudo`.

Specify where your commands have been defined via environment variables:

* `GO_COMMANDS_URL` - If your commands JSON file is located on a remote server
* `GO_COMMANDS_PATH` - If your commands JSON file is located on a local path

```
$ sudo GO_COMMANDS_PATH=/my/path/commands.json npm start
```
