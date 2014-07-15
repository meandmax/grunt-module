"use strict";

var createExecutable = require("./exe").createExecutable;

var Npm = function (grunt) {
    var executable = createExecutable(grunt, "npm");

    this.publish = function (callback) {
        executable.execute([
            "publish"
        ], callback);
    };
};

exports.createNpm = function (grunt) {
    return new Npm(grunt);
};
