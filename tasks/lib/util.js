'use strict';

var Git = require('./git'),
    Npm = require('./npm');

module.exports = function (grunt) {
    var git = new Git(grunt),
        npm = new Npm(grunt);

    this.check = function (options, callback) {
        if (options.check) {
            git.getBranch(function (branch) {
                if (branch !== 'master') {
                    grunt.fail.warn('Not on branch master.');
                }

                grunt.log.ok('On branch master.');

                git.getStatus(function (status) {
                    if (status) {
                        grunt.fail.warn('Unclean working tree.');
                    }

                    grunt.log.ok('Clean working tree.');

                    callback();
                });
            });
        } else {
            callback();
        }
    };

    this.createCopyright = function (options) {
        var currentYear = new Date().getFullYear(),
            pkg = grunt.file.readJSON('package.json'),
            inceptionYear = parseInt(pkg.inceptionYear, 10),
            copyright,
            prefix,
            suffix;

        if (isNaN(inceptionYear)) {
            inceptionYear = currentYear;
        }

        copyright = 'Copyright (c) ' + inceptionYear;

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

        prefix = grunt.template.process(options.prefix);
        suffix = grunt.template.process(options.suffix);

        return prefix + copyright + suffix;
    };

    this.publish = function (options, callback) {
        if (options.publish) {
            npm.publish(function () {
                grunt.log.ok('Published to npm.');

                callback();
            });
        } else {
            callback();
        }
    };

    this.release = function (options, callback) {
        if (options.release) {
            var pkg = grunt.file.readJSON('package.json'),
                version = 'v' + pkg.version,
                message = 'Release ' + version;

            git.add(function () {
                git.commit(message, function () {
                    git.tag(version, message, function () {
                        git.push(function () {
                            grunt.log.ok('Released ' + version + '.');

                            callback();
                        });
                    });
                });
            });
        } else {
            callback();
        }
    };
};
