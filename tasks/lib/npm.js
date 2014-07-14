'use strict';

var createExecutable = require('./exe').createExecutable;

function Npm(grunt) {
    var executable = createExecutable(grunt, 'npm');

    this.publish = function (callback) {
        executable.execute([
            'publish'
        ], callback);
    };
}

exports.createNpm = function (grunt) {
    return new Npm(grunt);
};
