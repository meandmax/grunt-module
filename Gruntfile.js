'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        bumpup: {
            options: {
                updateProps: {
                    pkg: 'package.json'
                }
            },
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

    grunt.registerTask('release', function (type) {
        grunt.task.run('lint');
        grunt.task.run('module:check');
        grunt.task.run('bumpup:' + (type || 'patch'));
    });

    grunt.registerTask('travis', 'lint');
};
