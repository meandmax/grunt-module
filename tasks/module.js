'use strict';

var stampit    = require('stampit');
var utilsStamp = require('./lib/utils.js');

module.exports = function (grunt) {
    grunt.registerMultiTask('module', function () {
        var done = this.async();

        var loggerStamp = stampit().methods({
            log: grunt.log.ok
        });

        var utils = utilsStamp.compose(loggerStamp).create(this.options({
            branch: 'master',
            check: false,
            publish: false,
            release: false
        }));

        utils.checkAsync()
            .then(function () {
                return utils.releaseAsync();
            })
            .then(function () {
                return utils.publishAsync();
            })
            .then(function () {
                return done();
            })
            .catch(function (error) {
                grunt.fail.warn(error.message);
            });
    });
};
