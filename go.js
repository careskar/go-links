#!/usr/bin/env node

const express = require('express');
const http = require('http');
const path = require('path');
const fetch = require('isomorphic-fetch');
const debug = require('debug')('go-links');

const app = express();

const GO_COMMANDS_URL = process.env.GO_COMMANDS_URL;
const GO_COMMANDS_PATH = process.env.GO_COMMANDS_PATH;
const COMMANDS_DEFAULT_PATH = path.resolve(__dirname, 'commands.json');

const getCommands = commandsUrl => {
  return fetch(commandsUrl)
    .then(response => response.json())
    .catch(error => {
      debug('Error', error);
      return {};
    });
};

app.get('/commands', (req, res) => {
  if (GO_COMMANDS_URL) {
    return getCommands(GO_COMMANDS_URL).then(commands => {
      res.json(commands);
    });
  } else if (GO_COMMANDS_PATH) {
    return res.sendFile(path.resolve(GO_COMMANDS_PATH));
  }

  res.sendFile(COMMANDS_DEFAULT_PATH);
});

app.use((req, res) => {
  const command = req.path && req.path.substring(1);
  getCommands().then(commands => {
    const url = commands[command];

    if (url) {
      debug(`Redirecting: ${command} -> ${url}`);
      res.redirect(url);
    } else {
      debug(`Command: '${command}' not found.`);
      res.send(
        `<div><h1>Command go/${command} does not exist.</h1><div>Following commands are available</div><pre>${JSON.stringify(
          commands,
          null,
          2
        )}`
      );
    }
  });
});

const server = http.createServer(app);

server.listen(80);

server.on('error', error => {
  debug('Server Error', error);
});

server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug(`Listening on ${bind}`);
});
