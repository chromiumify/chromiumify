#! /usr/bin/env node
var shell = require('shelljs')
var os = require('os')
var fs = require('fs')
var yargs = require('yargs')

yargs.usage('$0 command')
  .command('gen', 'generate a baseline chrome project (Expects a directory as an parameter)')
  .command('init', 'initialise the current directory with node for chrome apps. (Use -S to save to package.json)')
  .command('run', 'run the your app (expects a directory as an argument)')
  .command('', 'runs browserify with the corrent node for chrome apps configuration')
  .help('h')
  .alias('h', 'help')
  .argv

var args = process.argv.slice(2).join(' ')

switch (process.argv[2]) {
  case 'gen':
    if (!process.argv[3]) {
      console.log('gen requires a target directory')
      process.exit(1)
    }
    shell.cp('-Rf', __dirname + '/templates/gen/*', process.argv[3])
    break

  case 'npmpkg':
    if (!process.argv[3]) {
      console.log('npmpkg requires a directory to store the post install script')
      process.exit(1)
    }
    if (!process.argv[4]) {
      console.log('npmpkg requires the target directory of the chrome app')
      process.exit(1)
    }
    shell.exec('npm install launch-chrome-app -S')
    shell.cp('-Rf', __dirname + '/templates/postinstall/*', process.argv[3])

    // add postinstall to package.json
    fs.readFile('package.json', function (err, data) {
      if (err) {
        console.log(err)
        return
      }
      var pkg = JSON.parse(data)
      if (typeof pkg.scripts.postinstall === 'undefined') {
        pkg.scripts.postinstall = 'node ' + process.argv[3] + '/postinstall.js ' + process.argv[4]
        fs.writeFile('package.json', JSON.stringify(pkg), function (err) {
          if (err) {
            console.log(err)
            return
          }
        })
      } else {
        console.log('package.json already has a postinstall script consider adding:')
        console.log('"' + pkg.scripts.postinstall + ' && node ' + process.argv[3] + '/postinstall.js ' + process.argv[4] + '"')
      }
    })

    break

  case 'init':
    shell.exec('npm install chrome-net http-node chrome-fs chrome-dgram chrome-debug chrome-depd chrome-path chrome-https chrome-util-deprecate ' + args.split(' ').slice(1).join(' '))
    break

  case 'run':
    var app = process.cwd() + '/' + process.argv[3]
    var command = ' --load-and-launch-app=' + app

    if (!process.argv[3]) {
      console.log('run requires a target directory')
      process.exit(1)
    }
    var CHROME = process.env.CHROME
    switch (os.platform()) {
      case 'win32' :
        if (process.arch === 'x64') {
          CHROME = process.env.CHROME || '"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"' + command
        } else {
          CHROME = process.env.CHROME || '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"' + command
        }
        break
      case 'darwin' :
        CHROME = process.env.CHROME || '/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome' + command + ' > /dev/null 2>&1 &'
        break
      case 'linux' :
        CHROME = process.env.CHROME || '/opt/google/chrome/chrome' + command + '  > /dev/null 2>&1 &'
        break
      default :
        break
    }
    shell.exec(CHROME)
    break

  default:
    shell.exec('node ' + __dirname + '/node_modules/browserify/bin/cmd -r chrome-net:net -r http-node:http -r chrome-fs:fs -r chrome-dgram:dgram -r chrome-debug:debug -r chrome-depd:depd -r chrome-path:path -r chrome-https:https -r chrome-util-deprecate:util-deprecate ' + process.argv.slice(2).join(' '))
    break
}
