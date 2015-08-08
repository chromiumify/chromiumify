var path = require('path')
var lca = require('launch-chrome-app')
var app = path.join(process.cwd(), process.argv[3])

lca(app, function (err) {
  if (err) {
    console.log(err)
  }
})
