// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        // configurable paths
        yeoman: {
            app: 'app',
            dist: 'dist'
        },
        watch: {
            coffee: {
                files: ['<%%= yeoman.app %>/scripts/{,*/}*.coffee'],
                tasks: ['clean:scripts', 'coffee:dist', 'copy:scripts']
            },
            coffeeTest: {
                files: ['test/spec/{,*/}*.coffee'],
                tasks: ['coffee:test']
            },
            compass: {
                files: ['<%%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer']
            },
            styles: {
                files: ['<%%= yeoman.app %>/styles/{,*/}*.css'],
                tasks: ['copy:styles', 'autoprefixer']
            },
            data: {
                files: [<% if (includeAssemble) { %>
                     '<%%= yeoman.app %>/templates/**/*.hbs',<% } else { %>
                    '<%%= yeoman.app %>/*.html',<% } %>
					'.tmp/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ],
                tasks: [<% if (includeAssemble) { %>'assemble',<% } %> 'bless:server']
            }
        },
		browserSync: {
			dev: {
				bsFiles: {
					src : [
						".tmp/{,*/}*.html",
						".tmp/styles/{,*/}*.css",
						".tmp/scripts/{,*/}*.js"
					]
				},
				options: {
					watchTask: true,
						server: {
						port: 3000,
							baseDir: ['<%%= yeoman.app %>','.tmp']
					},
					ui: {
						port: 3001
					},
                    ghostMode: {
                        clicks: true,
                        forms: true,
                        scroll: true
                    },
                    startPath: "/styleguide.html"
				}
			}
		},
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%%= yeoman.dist %>/*',
                        '!<%%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp',
            scripts: '.tmp/scripts/*'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },<% if (testFramework === 'mocha') { %>
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://<%%= connect.test.options.hostname %>:<%%= connect.test.options.port %>/index.html']
                }
            }
        },<% } else if (testFramework === 'jasmine') { %>
        jasmine: {
            all: {
                options: {
                    specs: 'test/spec/{,*/}*.js'
                }
            }
        },<% } %>
        coffee: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/scripts',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/scripts',
                    ext: '.js'
                }<% if (groundworkCSS) { %>, {
                    expand: true,
                    cwd: '<%%= yeoman.app %>/bower_components/groundwork/src/coffee',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/scripts',
                    ext: '.js'
                }<% } %>]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'test/spec',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/spec',
                    ext: '.js'
                }]
            }
        },
        compass: {
            options: {
                sassDir: '<%%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%%= yeoman.app %>/images',
                javascriptsDir: '<%%= yeoman.app %>/scripts',
                fontsDir: '<%%= yeoman.app %>/fonts',
                importPath:<% if (compassBootstrap) { %>['<%%= yeoman.app %>/bower_components/','<%%= yeoman.app %>/bower_components/bootstrap-sass/assets/stylesheets/'],<% } else { %>'app/bower_components/',<% } %>
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/fonts',
                relativeAssets: false
            },
            dist: {
                options: {
                    generatedImagesDir: '<%%= yeoman.dist %>/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },
        bless: {
            server: {
                css: {
                    options: {
                        cacheBuster: false,
                        compress: false
                    },
                    files: {
                        '.tmp/styles/main.css': '.tmp/styles/*.css'
                    }
                }
            },
            dist: {
                options: {
                    cacheBuster: false,
                    compress: true
                },
                files: {
                    '<%%= yeoman.dist %>/styles/main.css': '<%%= yeoman.dist %>/styles/*.css'
                }
            }
        },
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
            dist: {}
        },*/<% if (includeRequireJS) { %>
        requirejs: {
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    // `name` and `out` is set by grunt-usemin
                    baseUrl: '.tmp/scripts',
                    optimize: 'none',
                    // TODO: Figure out how to make sourcemaps work with grunt-usemin
                    // https://github.com/yeoman/grunt-usemin/issues/30
                    //generateSourceMaps: true,
                    // required to support SourceMaps
                    // http://requirejs.org/docs/errors.html#sourcemapcomments
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true
                    //uglify2: {} // https://github.com/mishoo/UglifyJS2
                }
            }
        },<% } else { %>
        'bower-install': {
            app: {
                html: '<%%= yeoman.app %>/index.html',
                ignorePath: '<%%= yeoman.app %>/'
            }
        },
        // not enabled since usemin task does concat and uglify
        // check index.html to edit your build targets
        // enable this task if you prefer defining your build targets here
        /*uglify: {
            dist: {}
        },*/<% } %>
        rev: {
            dist: {
                files: {
                    src: [
                        '<%%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '<%%= yeoman.dist %>/fonts/{,*/}*.*'
                    ]
                }
            }
        },
        useminPrepare: {
            options: {
                dest: '<%%= yeoman.dist %>'
            },
            html: '<%%= yeoman.app %>/index.html'
        },
        usemin: {
            options: {
                dirs: ['<%%= yeoman.dist %>']
            },
            html: ['<%%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%%= yeoman.dist %>/styles/{,*/}*.css']
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%%= yeoman.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            // This task is pre-configured if you do not wish to use Usemin
            // blocks for your CSS. By default, the Usemin block from your
            // `index.html` will take care of minification, e.g.
            //
            //     <!-- build:css({.tmp,app}) styles/main.css -->
            //
            // dist: {
            //     files: {
            //         '<%%= yeoman.dist %>/styles/main.css': [
            //             '.tmp/styles/{,*/}*.css',
            //             '<%%= yeoman.app %>/styles/{,*/}*.css'
            //         ]
            //     }
            // }
        },
        htmlmin: {
            dist: {
                options: {
                    removeCommentsFromCDATA: false,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    // collapseWhitespace: false,
                    collapseBooleanAttributes: false,
                    removeAttributeQuotes: false,
                    removeRedundantAttributes: false,
                    useShortDoctype: false,
                    removeEmptyAttributes: false,
                    removeOptionalTags: false
                },
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%%= yeoman.dist %>'
                }]
            },
            deploy: {
                options: {
                    collapseWhitespace: false
                },
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%%= yeoman.dist %>'
                }]
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= yeoman.app %>',
                    dest: '<%%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif}',
                        'fonts/{,*/}*.*'<% if (compassBootstrap) { %>,
                        'bower_components/bootstrap-sass/assets/fonts/bootstrap/*.*'<% } %><% if (groundworkCSS) { %>,
                        'bower_components/groundwork/fonts/**',
                        'bower_components/groundwork/images/**',
                        'bower_components/groundwork/js/libs/**'<% } %>
                    ]
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }<% if (includeRequireJS) { %>,
            scripts: {
                files:[{
                    expand: true,
                    dot: true,
                    cwd: '<%%= yeoman.app %>/scripts',
                    dest: '.tmp/scripts/',
                    src: '{,*/}*.js'
                }, {
                    expand: true,
                    dot: true,
                    cwd: '<%%= yeoman.app %>',
                    dest: '.tmp',
                    src: ['bower_components/**']
                }]
            }<% } %>
        },<% if (includeModernizr) { %>
        modernizr: {
            devFile: '<%%= yeoman.app %>/bower_components/modernizr/modernizr.js',
            outputFile: '<%%= yeoman.dist %>/bower_components/modernizr/modernizr.js',
            files: [
                '<%%= yeoman.dist %>/scripts/{,*/}*.js',
                '<%%= yeoman.dist %>/styles/{,*/}*.css',
                '!<%%= yeoman.dist %>/scripts/vendor/*'
            ],
            uglify: true
        },<% } %>
        concurrent: {
            server: [
                'compass',
                'coffee:dist',
                'copy:styles'
            ],
            test: [
                'coffee',
                'copy:styles'
            ],
            dist: [
                'coffee',
                'compass',
                'copy:styles',
                'imagemin',
                'svgmin',
                'htmlmin:dist'
            ]
        }<% if (includeAssemble) { %>,
        assemble: {
            options: {
                flatten: true,
                layout: '<%%= yeoman.app %>/templates/layouts/default.hbs',
                partials: ['<%%= yeoman.app %>/templates/partials/*.hbs'],
            },
            pages: {
                files: {
                    '<%%= yeoman.app %>/': ['<%%= yeoman.app %>/templates/pages/*.hbs', '!<%%= yeoman.app %>/templates/pages/index.hbs']
                }
            },
            index: {
                files: {
                    '<%%= yeoman.app %>/': ['<%%= yeoman.app %>/templates/pages/index.hbs']
                }
            }
        }<% } %><% if (includeRequireJS) { %>,
        bower: {
            options: {
                exclude: ['modernizr']
            },
            all: {
                rjsConfig: '<%%= yeoman.app %>/scripts/main.js'
            }
        }<% } %>
    });

    <% if (includeAssemble) { %>
    grunt.loadNpmTasks('assemble'); // Doesn't follow the grunt-* naming scheme and therefor isn't loaded automatically
    <% } %>

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
			'clean:server',
			'concurrent:server',
			'autoprefixer',<% if (includeRequireJS) { %>
			'copy:scripts',<% } %><% if (includeAssemble) { %>
			'assemble',<% } %>
			'compass:server',
			'bless:server',
			'browserSync',
			'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',<% if (testFramework === 'mocha') { %>
        'mocha'<% } else if (testFramework === 'jasmine') { %>
        'jasmine'<% } %>
    ]);

    grunt.registerTask('build', [
        'clean:dist',<% if (includeAssemble) { %>
        'assemble',<% } %>
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',<% if (includeRequireJS) { %>
        'copy:scripts',
        'requirejs',<% } %>
        'concat',
        'cssmin',
        'uglify',<% if (includeModernizr) { %>
        'modernizr',<% } %>
        'copy:dist',
        'bless:dist',
        //'rev',
        'usemin',
        'htmlmin:deploy'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
