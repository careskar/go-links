# Go-links

Simple redirect service for mapping short commands to URLs.

Supports the possibility to write `go/<command>` in your browser to open URLs connected to your pre-defined commands.

## Commands

Commands are specified as a JSON map in the following format:

```json
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

Specify where your commands have been defined via environment variables:

* `GO_COMMANDS_URL` - If your commands JSON file is located on a remote server
* `GO_COMMANDS_PATH` - If your commands JSON file is located on a local path

## Modify your 'hosts' file

To get `go/<command>` to work on your computer you'll need to modify your hosts file pointing 'go' to 127.0.0.1:

```bash
# /etc/hosts
go 127.0.0.1
```

## Start the service

By default, the node server will try to run on port 80 in order to avoid specifying port number after 'go'. To allow the node server to run on port 80, you'd most likely need to start it with `sudo`:

$ sudo GO_COMMANDS_PATH=/my/path/commands.json npm start
