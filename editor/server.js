#!/usr/bin/env node
// Dependencies

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process')

// Base Directory - Assuming minimal-http-server 
// will be accessed  from its own folder.
const baseDir = path.join(__dirname, '.');
// Create a server

const gameName = process.env.npm_config_game ?? 'game-example'

const gameDir = path.join(__dirname, '..', gameName);

const httpServer = http.createServer(handleHttpRequest);
// Mime Types
const mimeTypes = {
  '.html': 'text/html',
  '.jpg': 'image/jpeg',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};
// Get the content type for a given path
const getContentType = pathName => {
  // Set the default content type
  let contentType = 'application/octet-stream';
  // Set the contentType based on mime type
  for (var key in mimeTypes) {
    if (mimeTypes.hasOwnProperty(key)) {
      if (pathName.indexOf(key) > -1) {
        contentType = mimeTypes[key];
      }
    }
  }
  return contentType;
};

let host = process.env.npm_config_host ?? 'localhost'
let port = process.env.npm_config_port ?? 3000

httpServer.listen(port, () => {
  console.log(`\x1b[32m%s\x1b[0m`, `Server is running at http://${host}:${port}`);
  var url = `http://${host}:${port}`;
  var start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
  var child = childProcess.exec(`${start} ${url}`);
});

function handleHttpRequest(request, response) {

  const parsedUrl = url.parse(request.url, true);
  let pathName = parsedUrl.pathname;

  let rootDir = baseDir

  if(pathName.startsWith(`/${gameName}`)) {
    pathName = pathName.substring(`/${gameName}`.length, pathName.length)
    rootDir = gameDir
  }

  if (pathName == "/" || pathName == "") {
    pathName = "/index.html"
  }

  // Get the contentType based on the file extension
  const responseContentType = getContentType(pathName);
  // Set the 'Content-Type' in response header
  response.setHeader('Content-Type', responseContentType);
  fs.readFile(path.join(rootDir, pathName), (error, data) => {
    if (!error) {
      response.writeHead(200);
      response.end(data);
    } else {
      console.error(error);
      response.writeHead(404);
      response.end('404 - File Not Found');
    }
  });
}




