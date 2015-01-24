# grunt-module

> A Grunt plugin to easily release and publish your npm module.

[![license](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.githubusercontent.com/clebert/grunt-module/master/LICENSE)
[![npm](http://img.shields.io/npm/v/grunt-module.svg?style=flat)](https://www.npmjs.org/package/grunt-module)
[![downloads](http://img.shields.io/npm/dm/grunt-module.svg?style=flat)](https://www.npmjs.org/package/grunt-module)

[![build](http://img.shields.io/travis/clebert/grunt-module/master.svg?style=flat)](https://travis-ci.org/clebert/grunt-module)
[![code climate](http://img.shields.io/codeclimate/github/clebert/grunt-module.svg?style=flat)](https://codeclimate.com/github/clebert/grunt-module)
[![dependencies](http://img.shields.io/david/clebert/grunt-module.svg?style=flat)](https://david-dm.org/clebert/grunt-module#info=dependencies&view=table)
[![devDependencies](http://img.shields.io/david/dev/clebert/grunt-module.svg?style=flat)](https://david-dm.org/clebert/grunt-module#info=devDependencies&view=table)

## Getting Started

This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```sh
npm install grunt-module --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```javascript
grunt.loadNpmTasks('grunt-module');
```

## The `module` task

### Overview

In your project's Gruntfile, add a section named `module` to the data object passed into `grunt.initConfig()`.

```javascript
grunt.initConfig({
    module: {
        options: {
            // Task-specific options go here.
        },
        your_target: {
            // Target-specific file lists and/or options go here.
        }
    }
});
```

### Options

#### options.branch

Type: `string`
Default value: `'master'`

The branch to release and publish from.

#### options.check

Type: `boolean`
Default value: `false`

Check that the branch is on `options.branch` and the working tree is clean.

#### options.publish

Type: `boolean`
Default value: `false`

Publish to the npm registry.

#### options.release

Type: `boolean`
Default value: `false`

Make and push a Git tag/release.

### Usage

This Grunt plugin works best in conjunction with a Grunt plugin like [grunt-bumpup](https://github.com/Darsain/grunt-bumpup) to update your project's npm version.

```javascript
grunt.initConfig({
    bumpup: {
        options: {
            newlineEof: true
        },
        file: 'package.json'
    },
    module: {
        'check-repository': {
            options: {
                branch: 'master',
                check: true
            }
        },
        'release-publish': {
            options: {
                release: true,
                publish: true
            }
        }
    }
});

grunt.registerTask('test', [
    // ...
]);

grunt.registerTask('publish', function (type) {
    grunt.task.run('test');
    grunt.task.run('module:check-repository');
    grunt.task.run('bumpup:' + type);
    grunt.task.run('module:release-publish');
});
```

## Running Tests

To run the test suite first install the development dependencies:

```sh
npm install
```

then run the tests:

```sh
npm test
```
