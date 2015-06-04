module.exports = function(grunt) {

  grunt.registerTask( 'default' , [
    'clean',
    'jekyll',
    'connect',
    'watch'
  ]);

  grunt.registerTask( 'compile' , [
    'clean',
    'jekyll',
    'cssmin',
    'htmlmin:compile',
    'imagemin',
    'hashres'
  ]);

  grunt.registerTask( 'deploy' , [
    'compile',
    'scp'
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
  grunt.loadNpmTasks('grunt-scp');
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

    htmlmin: {
      compile: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
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

    scp: {
      options: {
          host: 'todd.mn',
          username: 'root'
      },
      prod: {
          files: [{
              cwd: '_site',
              src: '**/*',
              filter: 'isFile',
              // path on the server
              dest: '/var/www/todd.mn/html'
          }]
      },
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
        '*.html',
        '*.md'
      ],
      tasks : [ 'jekyll' ]
    }

  });
};