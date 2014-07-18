'use strict';

var Promise = require('promise');
var execute = Promise.denodeify(require('child_process').exec);

var createCommand = function (name, args) {
    return name + ' ' + args.map(function (arg) {
        return '"' + arg + '"';
    }).join(' ');
};

var Executable = function (name) {
    this.execute = function (args) {
        return execute(createCommand(name, args)).then(function (result) {
            return result.trim();
        });
    };
};

module.exports = Executable;
