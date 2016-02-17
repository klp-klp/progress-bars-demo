module.exports = function(grunt) {

// # grunt 'default' (for dev)
// 1. 'concurrent:dev':
//    1a. 'watch:express':    start the server (express:dev, atBegin:true), and watch to enable reload if server files change
//    1b. 'watch:less'        compile less (less, atBegin:true), and watch to enable recompile of css if less files change *** don't let IDE handle LESS via filewatchers, Grunt should do it now, as we have more control ***
//    1c. 'watch:test'        'jshint' and 'karma:dev'

// # grunt 'build' (for deploy, jenkins ci)
// 1. 'build':                LESS, then usemin(concat/minify), ngtemplates, copy; to 'dist' folder
// 2. 'docular':              ?should we?
// 3. 'karma:continuous': test 'dist' (build output), singleRun: true

    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-bootlint');
    grunt.loadNpmTasks('grunt-htmllint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-lesslint');
    

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            dev: {
                tasks: ['watch:less', 'watch:bootlint', 'watch:htmllint', 'watch:jshint'] // we can call watcher with atBegin in order to both start && watch
            }
        },

        watch: {
            less: {
                files: ['src/less/**/*.less'],
                tasks: ['less'],
                options: {
                    atBegin: true
                }
            },
            bootlint: {
                files: ['src/**/*.html'],
                tasks: ['bootlint'],
                options: {
                    atBegin: true
                }
            },
            htmllint: {
                files: ['src/**/*.html'],
                tasks: ['htmllint'],
                options: {
                    atBegin: true
                }
            },
            jshint: {
                files: ['src/js/*.js'],
                tasks: ['jshint'],
                options: {
                    atBegin: true
                }
            }
        },

        lesslint: {
            src: ['src/less/*.less']
        },

        bootlint: {
            pages: {
                options: {
                    stoponerror: false,
                    relaxerror: []
                },
                src: ['src/*.html']
            },
            partials: {
                options: {
                    stoponerror: false,
                    relaxerror: ['E001', 'W001', 'W002', 'W003', 'W005']
                },
                src: ['src/partials/*.html']
            }

        },

        htmllint: {
            all_html: {
                options: {
                    force: true,
                    'attr-req-value': true,
                    'attr-no-dup': true,
                    'attr-quote-style': 'double',
                    //'doctype-first': true,
                    'focusable-tabindex-style': true,
                    'html-req-lang': true,
                    'class-style': 'dash',
                    'id-class-style': 'dash',
                    'attr-name-style': 'dash',
                    'img-req-alt': true,
                    'img-req-src': true,
                    'indent-style': 'spaces',
                    'indent-width': 4,
                    'tag-name-lowercase': true,
                    'tag-name-match': true,
                    'tag-self-close': true,
                    'line-end-style': false
                },
                src: [
                    'src/*.html',
                    'src/partials/*.html'
                ]
            }
        },

        jshint: {
            options: {
                force: true,
                // http://www.jshint.com/docs/options/
                camelcase: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                freeze: true,
                immed: true,
                indent: 2,
                latedef: 'nofunc',
                newcap: true,
                noarg: true,
                noempty: true,
                nonbsp: true,
                nonew: true,
                undef: true,
                //unused: true,
                strict: true,
                trailing: true,
                eqnull: true
            },
            all: {
                options: {
                    globals: {
                        "jQuery": true,
                        "$": true,
                        "setInterval": true
                    }
                },
                files: {
                    src: [
                        'src/js/*.js'
                    ]
                }
            }
        },

        less: {
            options: {
                sourceMap: true,
                sourceMapBasepath: 'src',
                sourceMapRootpath: '/'
            },
            styles: {
                options: {
                    sourceMapFilename: 'src/css/styles.map',
                    sourceMapURL: 'styles.map'
                },
                expand: true,
                cwd: 'src/',
                src: 'less/styles.less',
                dest: 'src/css/',
                ext: '.css',
                flatten: true
            },
            ie: {
                options: {
                    sourceMapFilename: 'src/css/ie.map',
                    sourceMapURL: 'ie.map'
                },
                expand: true,
                cwd: 'src/',
                src: 'less/ie.less',
                dest: 'src/css/',
                ext: '.css',
                flatten: true
            }
        },

        clean: {
            dist: ["dist", ".tmp", "code_drop"],
            test: ["test/results/**/*", "test/.tmp"],
            docs: ["docs"]
        }
    });

    grunt.registerTask('dist', [
        'less',
        'compress'
    ]);
    grunt.registerTask('build', [
        'bootlint',
        'jshint',
        'dist'
    ]);
    grunt.registerTask('default', ['concurrent:dev']);
};