'use strict';

function Executable(grunt, cmd) {
    this.execute = function (args, callback) {
        grunt.util.spawn({
            cmd: cmd,
            args: args
        }, function (error, result) {
            if (error) {
                grunt.fail.fatal(error);
            }

            callback(result.stdout);
        });
    };
}

exports.createExecutable = function (grunt, cmd) {
    return new Executable(grunt, cmd);
};
