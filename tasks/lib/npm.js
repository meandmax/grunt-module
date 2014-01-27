'use strict';

var Bin = require('./bin');

module.exports = function (grunt) {
    var npm = new Bin(grunt, 'npm');

    this.publish = function (callback) {
        npm.execute([
            'publish'
        ], callback);
    };
};
