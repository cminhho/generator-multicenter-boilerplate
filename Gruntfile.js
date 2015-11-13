/**
 * Created by mnagaiah on 8/21/15.
 */
'use strict';

module.exports = function (grunt) {


    // Load grunt tasks automatically, when needed
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin',
        ngtemplates: 'grunt-angular-templates',
        postcss: 'grunt-postcss',
        'string-replace': 'grunt-string-replace'
    });
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        pkg: grunt.file.readJSON('package.json'),
        yeoman: {
            // configurable paths
            tmp: '.tmp',
            dist: 'dist',
            app: '.'

        },
        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                '<%= yeoman.tmp %>/src/**/*.js',
                '!<%= yeoman.tmp %>/src/**/*.spec.js',
                '!<%= yeoman.tmp %>/src/**/*.mock.js'
            ],
            test: {
                src: [
                    '<%= yeoman.tmp %>/{src}/**/*.spec.js',
                    '<%= yeoman.tmp %>/{src}/**/*.mock.js'
                ]
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.svn*',
                        '!<%= yeoman.dist %>/.openshift',
                        '!<%= yeoman.dist %>/Procfile'
                    ]
                }]
            }
        },

        // Add vendor prefixed styles
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer-core')({browsers: ['last 5 version']})
                ]

            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: '<%= pkg.name%>.css',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        // Automatically inject Bower components into the app
        wiredep: {
            options: {
                directory: 'bower_components/'
            },
            html: {
                src: ['<%= yeoman.dist %>/examples/index.html'],
                // ignorePath: '<%= yeoman.tmp %>/',
                fileTypes: {
                    html: {
                        block: /(([ \t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
                        detect: {
                            js: /<script.*src=['"]([^'"]+)/gi,
                            css: /<link.*href=['"]([^'"]+)/gi
                        },
                        replace: {
                            js: '<script src="{{filePath}}"></script>',
                            css: '<link rel="stylesheet" href="{{filePath}}" />'
                        }
                    }

                }
            },
            karma: {
                src: ['karma.conf.js'],
		devDependencies: true,
                fileTypes: {
                    html: {
                        block:/(([ \t]*)\/\/\s*bower:*(\S*)\s*)(\n|\r|.)*?(\/\/\s*endbower\s*)/gi,
                        detect: {
                            js: /<script.*src=['"]([^'"]+)/gi
                        },
                        replace: {
                            js: '"{{filePath}}",'
                        }
                    }

                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: ['examples/index.html'],
            options: {
                dest: '<%= yeoman.dist %>/examples'
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/examples/index.html'
            ],
            css: ['<%= yeoman.dist %>/**/*.css'],
            js: ['<%= yeoman.dist %>/*.js'],
            options: {
                assetsDirs: [
                    '<%= yeoman.dist %>',
                    '<%= yeoman.dist %>assets/images',
                    '<%= yeoman.dist %>/assets/fonts'
                ],
                // This is so we update image references in our ng-templates
                patterns: {
                    js: [
                        [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
                    ]
                }
            }
        },


        // Allow the use of non-minsafe AngularJS files. Automatically makes it
        // minsafe compatible so Uglify does not destroy the ng references
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat',
                    src: '**/*.js',
                    dest: '.tmp/concat'
                }]
            }
        },

        // Package all the html partials into a single javascript payload
        ngtemplates: {
            options: {
                moduleName: '<%= pkg.name %>',
                // This should be the name of your apps angular module
                module: '<%= pkg.name %>',
                url: function (url) {
                    return this.moduleName + '/' + url;
                }
            },
            main: {
                cwd: '<%=yeoman.tmp %>',
                src: ['src/**/*.html', '!src/examples/**/*.html'],
                dest: '.tmp/templates.js'
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            tmp: {
                files: [
                    {
                        expand: true,
                        cwd: '.',
                        dest: '<%= yeoman.tmp %>',
                        src: ['assets/**/*',
                            'src/**/*',
                            'examples/**/*',
                            'bower.json',
                            'package.json']

                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: "<%= yeoman.tmp %>",
                        dest: '<%= yeoman.dist %>',
                        src: [
                            'package.json',
                            'bower.json'
                        ]
                    }, {
                        cwd: "<%= yeoman.tmp %>",
                        expand: true,
                        dest: '<%= yeoman.dist %>',
                        src: [
                            'assets/fonts/**/*',
                            'assets/images/**/*',
                            'assets/languages/**/*',
                            'bower.json',
                            'examples/**/*'
                        ]
                    }
                ]
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                options:{
                    frameworks:['jasmine'],
                    singleRun:true,
                    browsers:['PhantomJS']
                }
            }
        },
        stylus: {
            compile: {
                options: {},
                files: {
                    '<%= yeoman.dist %>/<%= pkg.name %>.css': '<%= yeoman.tmp %>/assets/styles/main.styl'
                }

            }
        },

        concat: {
            js: {
                files: {
                    "<%= yeoman.dist %>/<%= pkg.name %>.js": [
                        '<%= yeoman.tmp %>/src/**/*.js',
                        '<%= yeoman.tmp %>/templates.js',
                        '!<%= yeoman.tmp %>/src/**/*spec.js'
                    ]
                }
            }
        },
        'string-replace': {
            init: {
                files: [
                    {
                        expand: true,
                        cwd: "<%= yeoman.app %>",
                        src: [
                            "src/**/*.{js,html,styl,json}",
                            "examples/**/*.{js,html,styl,json}",
                            "assets/**/*.{js,html,styl,json}",
                            "*.{js,html,styl,json}"],
                        dest: "<%= yeoman.app %>"
                    }
                ],
                options: {
                    replacements: [{
                        pattern:/##app.name##/gi ,
                        replacement: "<%= pkg.name %>"
                    }]
                }
            }
        },
        injector: {
            options: {},
            // Inject application script files into index.html (doesn't include bower)
            scripts: {
                options: {
                    transform: function (filePath) {
                        // filePath = filePath.replace('/src/', '');
                        // filePath = filePath.replace('/.tmp/', '');
                        return '<script src="' + filePath + '"></script>';
                    },
                    starttag: '<!-- injector:js -->',
                    endtag: '<!-- endinjector -->',
                    relative: true,
                    sort: function (a, b) {
                        return b.localeCompare(a);
                    }
                },
                files: {
                    '<%=yeoman.dist%>/examples/index.html': [
                        [
                            '<%=yeoman.dist%>/<%= pkg.name %>.js'
                        ]
                    ]
                }
            },

            // Inject component scss into app.scss
            stylus: {
                options: {
                    transform: function (filePath) {
                        //filePath = filePath.replace('src/modules', '');
                        //filePath = filePath.replace('src/modules/', '');
                        return '@import \'' + filePath + '\';';
                    },
                    starttag: '//injector',
                    endtag: '//endinjector',
                    relative: true
                },
                files: {
                    '<%= yeoman.tmp %>/assets/styles/main.styl': [
                        '<%= yeoman.tmp %>/src/**/*.styl'
                    ]
                }
            },

            // Inject component css into index.html
            css: {
                options: {
                    transform: function (filePath) {
                        //filePath = filePath.replace('/src/', '');
                        /// filePath = filePath.replace('/.tmp/', '');
                        return '<link rel="stylesheet" href="' + filePath + '">';
                    },
                    starttag: '<!-- injector:css -->',
                    endtag: '<!-- endinjector -->',
                    relative: true

                },
                files: {
                    '<%=yeoman.dist%>/examples/index.html': [
                        '<%=yeoman.dist%>/<%= pkg.name %>.css'
                    ]
                }
            }
        }
    });

    grunt.registerTask('init-app', ['string-replace']);
    grunt.registerTask('default', [
        'clean:dist',
        'copy:tmp',
        'injector:stylus',
        'stylus',
        'postcss',
        'ngtemplates',
        'wiredep:karma',
        'karma',
        'concat',
        'ngAnnotate',
        'copy:dist',
        'wiredep:html',
        'injector:scripts',
        'injector:css'
    ]);

};
