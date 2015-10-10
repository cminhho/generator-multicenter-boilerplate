# generator-multicenter-boilerplate [![npm version](https://badge.fury.io/js/generator-multicenter-boilerplate.svg)](http://badge.fury.io/js/generator-multicenter-boilerplate)

## Usage

### Create your project

Install the required tools: `yo`, `gulp`, `bower`
```
npm install -g yo gulp bower
```

Install `generator-multicenter-boilerplate`:
```
npm install -g generator-multicenter-boilerplate
```

Make a new directory, and `cd` into it:
```
mkdir multicenter-boilerplate && cd $_
```

Run `yo multicenter-boilerplate`, optionally passing an app name:
```
yo multicenter-boilerplate [app-name]
```

### Use Gulp tasks

* `gulp` or `gulp build` to build an optimized version of your application in `/dist`
* `gulp serve` to launch a browser sync server on your source files
* `gulp serve:dist` to launch a server on your optimized application
* `gulp test` to launch your unit tests with Karma
* `gulp test:auto` to launch your unit tests with Karma in watch mode
* `gulp protractor` to launch your e2e tests with Protractor
* `gulp protractor:dist` to launch your e2e tests with Protractor on the dist files

## Contributing

[Guidelines](CONTRIBUTING.md)

## License

MIT
