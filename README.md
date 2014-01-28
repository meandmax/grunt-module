# grunt-module [![Build Status](https://travis-ci.org/clebert/grunt-module.png?branch=master)](https://travis-ci.org/clebert/grunt-module) [![Code Climate](https://codeclimate.com/github/clebert/grunt-module.png)](https://codeclimate.com/github/clebert/grunt-module) [![NPM version](https://badge.fury.io/js/grunt-module.png)](http://badge.fury.io/js/grunt-module)

> {%= description %}

## Getting Started

This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

    $ npm install grunt-module --save-dev

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

    grunt.loadNpmTasks('grunt-module');

## The "module" task

### Overview

In your project's Gruntfile, add a section named `module` to the data object passed into `grunt.initConfig()`.

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

### Options

#### options.replace

Type: `boolean`
Default value: `false`

Insert or replace the copyright information.

#### options.line

Type: `number`
Default value: `1`

The line number at which to insert or replace the copyright information.

#### options.newline

Type: `string`
Default value: `'\n'`

The newline character to use.

#### options.prefix

Type: `string`
Default value: `''`

The prefix to add before the copyright information.

#### options.suffix

Type: `string`
Default value: `''`

The suffix to add after the copyright information.

#### options.check

Type: `boolean`
Default value: `false`

Check the Git repository status.

#### options.release

Type: `boolean`
Default value: `false`

Make and push a tag/release.

#### options.publish

Type: `boolean`
Default value: `false`

Publish to the NPM registry.

### Usage Example

    grunt.initConfig({
        module: {
            'check-repository': {
                options: {
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

## Running the tests

To run the test suite first install the development dependencies:

    $ npm install

then run the tests:

    $ npm test

## License

Licensed under the MIT license.
