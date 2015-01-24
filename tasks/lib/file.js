/* global -Promise */

'use strict';

var Promise       = require('bluebird');
var readFileAsync = Promise.promisify(require('fs').readFile);
var stampit       = require('stampit');

var fileStamp = stampit().methods({
    readAsync: function () {
        return readFileAsync(this.name, {
            encoding: this.encoding
        });
    },
    readJsonAsync: function () {
        return this.readAsync().then(JSON.parse);
    }
}).state({
    encoding: 'utf8',
    name: null
});

module.exports = fileStamp;
