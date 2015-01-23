/* global -Promise */

'use strict';

var exec    = require('child_process').exec;
var Promise = require('bluebird');

var createCommand = function (name, args) {
    return name + ' ' + args.map(function (arg) {
        return '"' + arg + '"';
    }).join(' ');
};

var Executable = function (name) {
    this.execute = function (args) {
        return new Promise(function (resolve, reject) {
            exec(createCommand(name, args), function (error, stdout) {
                if (error) {
                    reject(error);
                } else {
                    resolve(stdout.trim());
                }
            });
        });
    };
};

module.exports = Executable;
