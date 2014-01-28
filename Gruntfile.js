'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        bumpup: {
            file: 'package.json'
        },
        jshint: {
            js: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: [
                    '**/*.js',
                    '!node_modules/**/*.js'
                ]
            },
            json: {
                src: [
                    '**/*.json',
                    '!node_modules/**/*.json'
                ]
            }
        },
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

    grunt.loadNpmTasks('grunt-bumpup');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.loadTasks('tasks');

    grunt.registerTask('default', 'lint');

    grunt.registerTask('lint', [
        'jshint:js',
        'jshint:json'
    ]);

    grunt.registerTask('publish', function (type) {
        grunt.task.run('lint');
        grunt.task.run('module:check');
        grunt.task.run('bumpup:' + (type || 'patch'));
        grunt.task.run('module:license');
        grunt.task.run('module:release-publish');
    });

    grunt.registerTask('travis', 'lint');
};
