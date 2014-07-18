'use strict';

var Executable = require('./executable');

var Npm = function () {
    var npm = new Executable('npm');

    this.publish = function () {
        return npm.execute([
            'publish'
        ]);
    };
};

module.exports = Npm;
