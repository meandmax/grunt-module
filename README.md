# grunt-module

> A Grunt plugin to release and publish an npm module.

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

#### options.replace

Type: `boolean`
Default value: `false`

Insert or replace the generated copyright notice.

#### options.line

Type: `number`
Default value: `1`

The line number at which to insert or replace the generated copyright notice.

#### options.newline

Type: `string`
Default value: `'\n'`

The newline character to use.

#### options.prefix

Type: `string`
Default value: `''`

The prefix to add before the generated copyright notice.

#### options.suffix

Type: `string`
Default value: `''`

The suffix to add after the generated copyright notice.

#### options.check

Type: `boolean`
Default value: `false`

Check that the branch is on `options.branch` and the working tree is clean.

#### options.release

Type: `boolean`
Default value: `false`

Make and push a Git tag/release.

#### options.publish

Type: `boolean`
Default value: `false`

Publish to the npm registry.

### Usage

```javascript
grunt.initConfig({
    module: {
        'check-repository': {
            options: {
                branch: 'release',
                check: true
            }
        },
        'license-copyright': {
            options: {
                replace: true,
                line: 3
            },
            src: 'LICENSE'
        },
        'release-publish': {
            options: {
                release: true,
                publish: true
            }
        }
    }
});
```

If this plugin is used to generate a copyright notice, please add the following fields to your project's `package.json` file:

```json
{
    "author": {
        "name": "your_name",
        "email": "optional_your_email",
        "url": "optional_your_url"
    },
    "inceptionYear": 2014
}
```

Use a grunt plugin like [grunt-bumpup](https://github.com/Darsain/grunt-bumpup) to update your project's npm version.

## Running Tests

To run the test suite first install the development dependencies:

```sh
npm install
```

then run the tests:

```sh
npm test
```
