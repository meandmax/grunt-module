'use strict';

var Git = require('./git');
var Npm = require('./npm');
var Promise = require('promise');

var git = new Git();
var npm = new Npm();

var MultiTask = function (grunt, options) {
    this.check = options.check ? function () {
        return git.getBranch().then(function (branch) {
            if (branch !== options.branch) {
                grunt.fail.warn('Not on branch ' + options.branch + '.');
            }

            grunt.log.ok('On branch ' + branch + '.');
        }).then(git.getStatus).then(function (status) {
            if (status) {
                grunt.fail.warn('Unclean working tree.');
            }

            grunt.log.ok('Clean working tree.');
        });
    } : Promise.resolve;

    this.publish = options.publish ? function () {
        return npm.publish().then(function () {
            grunt.log.ok('Published to npm.');
        });
    } : Promise.resolve;

    this.release = options.release ? function () {
        var pkg = grunt.file.readJSON('package.json');
        var version = 'v' + pkg.version;
        var message = 'Release ' + version;

        return git.addAll().then(function () {
            return git.commit(message);
        }).then(function () {
            return git.tag(version, message);
        }).then(git.pushAll).then(function () {
            grunt.log.ok('Released ' + version + '.');
        });
    } : Promise.resolve;

    var createCopyright = function () {
        var currentYear = new Date().getFullYear();
        var pkg = grunt.file.readJSON('package.json');
        var inceptionYear = parseInt(pkg.inceptionYear, 10);

        if (isNaN(inceptionYear)) {
            inceptionYear = currentYear;
        }

        var copyright = 'Copyright (c) ' + inceptionYear;

        if (inceptionYear !== currentYear) {
            copyright += ', ' + currentYear;
        }

        copyright += ' ' + pkg.author.name;

        if (pkg.author.email) {
            copyright += ' <' + pkg.author.email + '>';
        }

        if (pkg.author.url) {
            copyright += ' (' + pkg.author.url + ')';
        }

        var prefix = grunt.template.process(options.prefix);
        var suffix = grunt.template.process(options.suffix);

        return prefix + copyright + suffix;
    };

    this.writeCopyright = function (filename) {
        var lines = grunt.file.read(filename).split(options.newline);
        var copyright = createCopyright();

        if (options.replace) {
            lines.splice(options.line - 1, 1, copyright);
        } else {
            lines.splice(options.line - 1, 0, copyright);
        }

        grunt.file.write(filename, lines.join(options.newline));

        grunt.log.ok('Modified file "' + filename + '".');
    };
};

module.exports = MultiTask;
