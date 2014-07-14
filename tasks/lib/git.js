'use strict';

var createExecutable = require('./exe').createExecutable;

function Git(grunt) {
    var executable = createExecutable(grunt, 'git');

    this.addAll = function (callback) {
        executable.execute([
            'add',
            '--all'
        ], callback);
    };

    this.commit = function (message, callback) {
        executable.execute([
            'commit',
            '-m',
            message
        ], callback);
    };

    this.getBranch = function (callback) {
        executable.execute([
            'rev-parse',
            '--abbrev-ref',
            'HEAD'
        ], callback);
    };

    this.getStatus = function (callback) {
        executable.execute([
            'status',
            '--porcelain'
        ], callback);
    };

    this.pushAll = function (callback) {
        executable.execute([
            'push',
            '--all'
        ], function () {
            executable.execute([
                'push',
                '--tags'
            ], callback);
        });
    };

    this.tag = function (name, message, callback) {
        executable.execute([
            'tag',
            '-a',
            name,
            '-m',
            message
        ], callback);
    };
}

exports.createGit = function (grunt) {
    return new Git(grunt);
};
