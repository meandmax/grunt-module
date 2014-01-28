'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        module: {
            check: {
                options: {
                    check: true
                }
            },
            license: {
                options: {
                    replace: true,
                    line: 3
                },
                src: 'LICENSE'
            },
            'release-publish': {
                options: {
                    release: true,
                    publish: true
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
