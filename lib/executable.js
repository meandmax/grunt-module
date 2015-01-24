/* global -Promise */

'use strict';

var Promise   = require('bluebird');
var execAsync = Promise.promisify(require('child_process').exec);
var stampit   = require('stampit');

var createCommand = function (name, args) {
    return name + ' ' + args.map(function (arg) {
        return '"' + arg + '"';
    }).join(' ');
};

var executableStamp = stampit().methods({
    executeAsync: function (args) {
        return execAsync(createCommand(this.name, args)).then(function (result) {
            return result[0].trim();
        });
    }
}).state({
    name: null
});

module.exports = executableStamp;
