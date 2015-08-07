var path = require('path')
var lca = require('launch-chrome-app')

var app = path.join(__dirname, '/chrome-app')

lca(app, function (err) {
  if (err) {
    console.log(err)
  }
})
