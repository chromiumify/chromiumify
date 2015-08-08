# chromiumify
A command line client for the chromiumify libraries.

## install 

```sh
$ npm install chromiumify -g
```

## usage

In your project initialise the node core modules

```sh
$ chromiumify init
```
This will install the chrome app modules that support running node. 

  * chrome-net 
  * http-node 
  * chrome-fs 
  * chrome-dgram 
  * chrome-debug 
  * chrome-depd 
  * chrome-path 
  * chrome-https 
  * chrome-util-deprecate

Run a build with the usual browserify parameters 

```sh
$ chromiumify test/src/background.js -o test/chrome-app/background.js
```

Run your application

```sh
$ chromiumify run test/chrome-app
```

Prepare to publish your app in NPM 

```sh
$ chromiumify npmpkg . test/chrome-app
```

Thanks to the following people who made this tool possible

<table><tbody>
<tr><th align="left">Feross Aboukhadijeh</th><td><a href="https://github.com/feross">GitHub/feross</a></td><td><a href="https://twitter.com/feross">Twitter/@feross</a></td></tr>
<tr><th align="left">Jan Schär</th><td><a href="https://github.com/jscissr">GitHub/jscissr</a></td><td><a href="https://twitter.com/jscissr">Twitter/@jscissr</a></td></tr>
<tr><th align="left">Michał Sobkiewicz</th><td><a href="https://github.com/perceptron8">GitHub/perceptron8</a></td><td><a href="https://twitter.com/perceptron8">Twitter/@perceptron8</a></td></tr>
</tbody></table>
