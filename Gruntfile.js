'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        module: {
            license: {
                options: {
                    replace: true,
                    line: 3
                },
                src: 'LICENSE'
            },
            check: {
                options: {
                    check: true
                }
            }
        }
    });

    grunt.loadTasks('tasks');

    grunt.registerTask('default', [
        'module:license',
        'module:check'
    ]);
};
