var to5ify = require('6to5ify');

module.exports = function(grunt) {

    grunt.initConfig({

        browserify: {
            dev: {
                src: ['app/index.jsx'],
                dest: 'public/src/script/app.js',
                options: {
                    transform: [
                        to5ify.configure({
                            experimental: true
                        })
                    ],
                    watch: true,
                    keepAlive: true
                }
            }
        },

        nodemon: {
            dev: {
                script: 'index.js',
                options: {
                    cwd: __dirname,
                    watch: ['config', 'server', 'app', 'index.js'],
                    ext: 'js,json,jsx,es',
                    env: {
                        NODE_ENV: 'development'
                    }
                }
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true,
                limit: 6
            },

            dev: ['nodemon:dev', 'browserify:dev'],
        }

    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['concurrent:dev']);
}
