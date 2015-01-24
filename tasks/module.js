'use strict';

var stampit    = require('stampit');
var utilsStamp = require('./lib/utils.js');

module.exports = function (grunt) {
    grunt.registerMultiTask('module', function () {
        var loggerStamp = stampit().methods({
            log: grunt.log.ok
        });

        var utils = utilsStamp.compose(loggerStamp).create(this.options({
            branch: 'master',
            check: false,
            publish: false,
            release: false
        }));

        var done = this.async();

        utils.checkAsync().then(function () {
            return utils.releaseAsync();
        }).then(function () {
            return utils.publishAsync();
        }).then(done).catch(function (error) {
            grunt.fail.warn(error.message);
        });
    });
};
