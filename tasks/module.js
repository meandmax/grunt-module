'use strict';

var pkg = require('../package'),
    Util = require('./lib/util');

module.exports = function (grunt) {
    var util = new Util(grunt);

    grunt.registerMultiTask('module', pkg.description, function () {
        var done = this.async(),
            options;

        options = this.options({
            replace: false,
            line: 1,
            newline: '\n',
            prefix: '',
            suffix: '',
            check: false,
            release: false,
            publish: false
        });

        this.files.forEach(function (file) {
            file.src.forEach(function (filename) {
                var lines = grunt.file.read(filename).split(options.newline),
                    copyright = util.createCopyright(options);

                if (options.replace) {
                    lines.splice(options.line - 1, 1, copyright);
                } else {
                    lines.splice(options.line - 1, 0, copyright);
                }

                grunt.file.write(filename, lines.join(options.newline));

                grunt.log.ok('Modified file "' + filename + '".');
            });
        });

        util.check(options, function () {
            util.release(options, function () {
                util.publish(options, done);
            });
        });
    });
};
