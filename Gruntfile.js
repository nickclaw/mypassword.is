module.exports = function(grunt) {

    grunt.initConfig({

        watch: {
            scss: {
                files: ["public/src/style/**/*.scss"],
                tasks: ["style:dev"]
            }
        },

        nodemon: {
            dev: {
                script: 'index.js',
                options: {
                    cwd: __dirname,
                    watch: ['config', 'server', 'Gruntfile.js', 'index.js', 'validation'],
                    ext: 'js,json,jsx,es',
                    env: {
                        NODE_ENV: 'development'
                    }
                }
            }
        },

        htmlmin: {
            prod: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'public/src/template',
                    src: '**/*.html',
                    dest: 'public/build/template/'
                }]
            }
        },

        imagemin: {
            prod: {
                options: {
                    optimizationLevel: 3,
                    progressive: true,
                    interlaced: true
                },
                files: [{
                    expand: true,
                    cwd: 'public/src/image',
                    src: ['**/*.jpg', '**/*.png', '**/*.gif'],
                    dest: 'public/build/image/'
                }]
            }
        },

        sass: {
            dev: {
                options: {
                    style: 'nested'
                },
                files: {
                    "public/src/style/index.css": "public/src/style/index.scss"
                }
            },
            prod: {
                options: {
                    style: 'compressed'
                },
                files: {
                    "public/build/style/index.css": "public/src/style/index.scss"
                }
            }
        },

        autoprefixer: {
            prod: {
                options: {
                    browsers: ['last 3 versions']
                },
                expand: true,
                flatten: true,
                src: 'public/build/style/**/*.css',
                dest: 'public/build/style/'
            },

            dev: {
                options: {
                    browsers: ['last 3 versions']
                },
                expand: true,
                flatten: true,
                src: 'public/src/style/**/*.css',
                dest: 'public/src/style/'
            }
        },

        uglify: {
            prod: {
                options: {
                    compress: true,
                    report: 'min',
                    sourceMap: true,
                    wrap: true
                },
                files: {
                    'public/build/script/app.js': ['public/src/script/**/*.js']
                }
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true,
                limit: 6
            },

            dev: ['watch:scss', 'nodemon:dev'],
            prod: ['htmlmin:prod', 'imagemin:prod', 'style:prod', 'uglify:prod']
        }

    });

    grunt.loadNpmTasks("grunt-autoprefixer");
    grunt.loadNpmTasks("grunt-concurrent");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-contrib-imagemin");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-nodemon");

    grunt.registerTask('style:prod', ['sass:prod', 'autoprefixer:prod']);
    grunt.registerTask('style:dev', ['sass:dev', 'autoprefixer:dev']);

    grunt.registerTask('default', ['develop']);
    grunt.registerTask('develop', ['style:dev', 'concurrent:dev']);
    grunt.registerTask('build', ['concurrent:prod']);
};
