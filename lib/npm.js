'use strict';

var executableStamp = require('./executable.js');
var stampit         = require('stampit');

var npmStamp = stampit().methods({
    publishAsync: function () {
        return this.executeAsync([
            'publish'
        ]);
    }
}).state({
    name: 'npm'
});

module.exports = executableStamp.compose(npmStamp);
