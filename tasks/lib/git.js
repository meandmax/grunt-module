'use strict';

var executableStamp = require('./executable.js');
var stampit         = require('stampit');

var gitStamp = stampit().methods({
    addAllAsync: function () {
        return this.executeAsync([
            'add',
            '--all'
        ]);
    },
    commitAsync: function (message) {
        return this.executeAsync([
            'commit',
            '-m',
            message
        ]);
    },
    getBranchAsync: function () {
        return this.executeAsync([
            'rev-parse',
            '--abbrev-ref',
            'HEAD'
        ]);
    },
    getStatusAsync: function () {
        return this.executeAsync([
            'status',
            '--porcelain'
        ]);
    },
    pushAllAsync: function () {
        var self = this;

        return self.executeAsync([
            'push',
            '--all'
        ]).then(function () {
            return self.executeAsync([
                'push',
                '--tags'
            ]);
        });
    },
    resetHardAsync: function () {
        return this.executeAsync([
            'reset',
            '--hard'
        ]);
    },
    tagAsync: function (name, message) {
        return this.executeAsync([
            'tag',
            '-a',
            name,
            '-m',
            message
        ]);
    }
}).state({
    name: 'git'
});

module.exports = executableStamp.compose(gitStamp);
