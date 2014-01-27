'use strict';

var Bin = require('./bin');

module.exports = function (grunt) {
    var git = new Bin(grunt, 'git');

    this.add = function (callback) {
        git.execute([
            'add',
            '--all'
        ], callback);
    };

    this.commit = function (message, callback) {
        git.execute([
            'commit',
            '-m',
            message
        ], callback);
    };

    this.getBranch = function (callback) {
        git.execute([
            'rev-parse',
            '--abbrev-ref',
            'HEAD'
        ], callback);
    };

    this.getStatus = function (callback) {
        git.execute([
            'status',
            '--porcelain'
        ], callback);
    };

    this.push = function (callback) {
        git.execute([
            'push',
            '--all'
        ], function () {
            git.execute([
                'push',
                '--tags'
            ], callback);
        });
    };

    this.tag = function (name, message, callback) {
        git.execute([
            'tag',
            '-a',
            name,
            '-m',
            message
        ], callback);
    };
};
