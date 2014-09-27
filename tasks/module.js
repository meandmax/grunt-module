'use strict';

var MultiTask = require('./lib/multitask');

module.exports = function (grunt) {
    grunt.registerMultiTask('module', function () {
        var self = this;

        var options = self.options({
            branch: 'master',
            replace: false,
            line: 1,
            newline: '\n',
            prefix: '',
            suffix: '',
            check: false,
            release: false,
            publish: false
        });

        var writeCopyright = function () {
            self.files.forEach(function (file) {
                file.src.forEach(multiTask.writeCopyright);
            });
        };

        var multiTask = new MultiTask(grunt, options);

        multiTask.check()
            .then(writeCopyright)
            .then(multiTask.release)
            .then(multiTask.publish)
            .then(self.async())
            .catch(function (error) {
                grunt.fail.warn(error.message);
            });
    });
};
