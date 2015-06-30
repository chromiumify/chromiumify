var shell = require('shelljs')
var http = require('http')
var assert = require('assert')

shell.exec('node index.js init')
shell.exec('node index.js gen test/chrome-app')
shell.exec('node index.js test/src/background.js -o test/chrome-app/background.js')
shell.exec('node index.js run test/chrome-app')

setTimeout(function () {
  var options = {
    host: '127.0.0.1',
    port: 1337,
    path: '/'
  }

  var callback = function (response) {
    var str = ''

    response.on('data', function (chunk) {
      str += chunk
    })

    response.on('end', function () {
      assert(str, 'Hello World')
      console.log('Server Responded: ' + str)
    })
  }

  http.request(options, callback).end()
}, 3000)
