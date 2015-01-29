module.exports = function(grunt) {

  grunt.registerTask( 'default' , [
    'clean',
    'jekyll',
    'connect',
    'watch'
  ]);

  grunt.registerTask( 'test' , [
    'htmllint'
  ]);

  grunt.registerTask( 'compile' , [
    'clean',
    'jekyll',
    'cssmin',
    'htmlmin:compile',
    'imagemin',
    'hashres'
  ]);

  var mozjpeg = require('imagemin-mozjpeg');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-hashres');
  grunt.loadNpmTasks('grunt-html');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build: [ '_site' ],
    },

    connect: {
      server: {
        options: {
          port: 9000,
          base: '_site'
        }
      }
    },

    cssmin: {
      compile: {
        files: {
          '_site/css/main.css': [ '_site/css/main.css' ]
        }
      }
    },

    hashres: {
      compile: {
        options: {
          encoding: 'utf8',
          fileNameFormat: '${name}.${hash}.${ext}',
          renameFiles: true
        },
        src: [
          '_site/css/main.css',
        ],
        dest: '_site/**/*.html',
      }
    },

    htmllint: {
      test: [ "**/*.html" ]
    },

    htmlmin: {
      compile: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true
        },
        files: [{
          expand: true,
          cwd: '_site',
          src: '**/*.html',
          dest: '_site/'
        }]
      }
    },

    imagemin: {
      compile: {
        options: {
          optimizationLevel: 3,
          use: [mozjpeg()]
        },
        files: [{
          expand: true,
          cwd: '_site/img',
          src: [ '**/*.{png,jpg,gif}' ],
          dest: '_site/img'
        }]
      }
    },

    jekyll: {
      build: {
        options: {
          config: '_config.yml'
        }
      }
    },

    watch : {
      files : [
        '_includes/**',
        '_layouts/**',
        '_posts/**',
        '_sass/**',
        'css/**',
        'img/**',
        '_config.yml',
        '*.html'
      ],
      tasks : [ 'jekyll' ]
    }

  });
};