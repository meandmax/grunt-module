'use strict';

var Executable = require('./executable');

var Git = function () {
    var git = new Executable('git');

    this.addAll = function () {
        return git.execute([
            'add',
            '--all'
        ]);
    };

    this.commit = function (message) {
        return git.execute([
            'commit',
            '-m',
            message
        ]);
    };

    this.getBranch = function () {
        return git.execute([
            'rev-parse',
            '--abbrev-ref',
            'HEAD'
        ]);
    };

    this.getStatus = function () {
        return git.execute([
            'status',
            '--porcelain'
        ]);
    };

    this.pushAll = function () {
        return git.execute([
            'push',
            '--all'
        ]).then(function () {
            return git.execute([
                'push',
                '--tags'
            ]);
        });
    };

    this.resetHard = function () {
        return git.execute([
            'reset',
            '--hard'
        ]);
    };

    this.tag = function (name, message) {
        return git.execute([
            'tag',
            '-a',
            name,
            '-m',
            message
        ]);
    };
};

module.exports = Git;
