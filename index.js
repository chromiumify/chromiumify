#! /usr/bin/env node
var shell = require('shelljs')
var os = require('os')
var args = process.argv.slice(2).join(' ')

switch (process.argv[2]) {
  case 'gen':
    shell.cp('-R', __dirname + '/templates/*', process.argv[3])
  break

  case 'init':
    shell.exec('npm install chrome-net http-node chrome-fs chrome-dgram ' + args)
  break

  case 'run':
  var CHROME = process.env.CHROME
  switch (os.platform()) {
    case 'win32' :
      if (process.arch === 'x64') {
        CHROME = process.env.CHROME || '\"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe\"'
      } else {
        CHROME = process.env.CHROME || '\"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe\"'
      }
      break
    case 'darwin' :
      CHROME = process.env.CHROME || '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'
      break
    case 'linux' :
      CHROME = process.env.CHROME || '/opt/google/chrome/chrome'
      break
    default :
      break
  }

    var app = process.cwd() + '/' + process.argv[3]
    var command = CHROME + ' --load-and-launch-app=' + app
    shell.exec(command)
  break

  default:
    shell.exec('node ' + __dirname + '/node_modules/browserify/bin/cmd -r chrome-net:net -r http-node:http -r chrome-fs:fs -r chrome-dgram:dgram ' + process.argv.slice(2).join(' '))
    break
}
