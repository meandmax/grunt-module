"use strict";

var createGit = require("./lib/git").createGit;
var createNpm = require("./lib/npm").createNpm;
var description = require("../package").description;

var check = function (grunt, options, callback) {
    if (!options.check) {
        setImmediate(callback);
        return;
    }

    var git = createGit(grunt);

    git.getBranch(function (branch) {
        if (branch !== "master") {
            grunt.fail.warn("Not on branch master.");
        }

        grunt.log.ok("On branch master.");

        git.getStatus(function (status) {
            if (status) {
                grunt.fail.warn("Unclean working tree.");
            }

            grunt.log.ok("Clean working tree.");

            callback();
        });
    });
};

var createCopyright = function (grunt, options) {
    var currentYear = new Date().getFullYear();
    var pkg = grunt.file.readJSON("package.json");
    var inceptionYear = parseInt(pkg.inceptionYear, 10);

    if (isNaN(inceptionYear)) {
        inceptionYear = currentYear;
    }

    var copyright = "Copyright (c) " + inceptionYear;

    if (inceptionYear !== currentYear) {
        copyright += ", " + currentYear;
    }

    copyright += " " + pkg.author.name;

    if (pkg.author.email) {
        copyright += " <" + pkg.author.email + ">";
    }

    if (pkg.author.url) {
        copyright += " (" + pkg.author.url + ")";
    }

    var prefix = grunt.template.process(options.prefix);
    var suffix = grunt.template.process(options.suffix);

    return prefix + copyright + suffix;
};

var publish = function (grunt, options, callback) {
    if (!options.publish) {
        setImmediate(callback);
        return;
    }

    createNpm(grunt).publish(function () {
        grunt.log.ok("Published to npm.");

        callback();
    });
};

var release = function (grunt, options, callback) {
    if (!options.release) {
        setImmediate(callback);
        return;
    }

    var git = createGit(grunt);

    git.addAll(function () {
        var pkg = grunt.file.readJSON("package.json");
        var version = "v" + pkg.version;
        var message = "Release " + version;

        git.commit(message, function () {
            git.tag(version, message, function () {
                git.pushAll(function () {
                    grunt.log.ok("Released " + version + ".");

                    callback();
                });
            });
        });
    });
};

var createTask = function (grunt, context) {
    var options = context.options({
        "replace": false,
        "line": 1,
        "newline": "\n",
        "prefix": "",
        "suffix": "",
        "check": false,
        "release": false,
        "publish": false
    });

    context.files.forEach(function (file) {
        file.src.forEach(function (path) {
            var lines = grunt.file.read(path).split(options.newline);
            var copyright = createCopyright(grunt, options);

            if (options.replace) {
                lines.splice(options.line - 1, 1, copyright);
            } else {
                lines.splice(options.line - 1, 0, copyright);
            }

            grunt.file.write(path, lines.join(options.newline));

            grunt.log.ok("Modified file '" + path + "'.");
        });
    });

    var done = context.async();

    check(grunt, options, function () {
        release(grunt, options, function () {
            publish(grunt, options, done);
        });
    });
};

module.exports = function (grunt) {
    grunt.registerMultiTask("module", description, function () {
        createTask(grunt, this);
    });
};
