/* global -Promise */

'use strict';

var fileStamp = require('./file.js');
var gitStamp  = require('./git.js');
var npmStamp  = require('./npm.js');
var Promise   = require('bluebird');
var readline  = require('readline');
var stampit   = require('stampit');

var git = gitStamp.create();
var npm = npmStamp.create();

var utilsStamp = stampit().methods({
    checkAsync: function () {
        var self = this;

        if (!self.check) {
            return Promise.resolve();
        }

        return git.getBranchAsync().then(function (branch) {
            if (branch !== self.branch) {
                throw new Error('Not on branch ' + self.branch + '.');
            }

            self.log('On branch ' + branch + '.');
        }).then(function () {
            return git.getStatusAsync();
        }).then(function (status) {
            if (status) {
                throw new Error('Unclean working tree.');
            }

            self.log('Clean working tree.');
        });
    },
    log: console.log,
    publishAsync: function () {
        var self = this;

        if (!self.publish) {
            return Promise.resolve();
        }

        return npm.publishAsync().then(function () {
            self.log('Published to npm.');
        });
    },
    releaseAsync: function () {
        var self = this;

        if (!self.release) {
            return Promise.resolve();
        }

        return fileStamp.create({
            name: 'package.json'
        }).readJsonAsync().then(function (pkg) {
            var version = 'v' + pkg.version;
            var message = 'Release ' + version;

            return new Promise(function (resolve, reject) {
                var rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });

                rl.question(message + '? [Y/n]\n', function (answer) {
                    rl.close();

                    if (!(/^\s*y/i).test(answer)) {
                        reject(new Error('Release aborted.'));
                    } else {
                        resolve();
                    }
                });
            }).then(function () {
                return git.addAllAsync();
            }).then(function () {
                return git.commitAsync(message);
            }).then(function () {
                return git.tagAsync(version, message);
            }).then(function () {
                return git.pushAsync();
            }).then(function () {
                self.log('Released ' + version + '.');
            });
        });
    }
}).state({
    branch: 'master',
    check: false,
    publish: false,
    release: false
});

module.exports = utilsStamp;
