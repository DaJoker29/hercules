module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true,
      },
      dev: {
        options: {
          outputStyle: 'expanded',
        },
        files: {
          'app/public/css/style.css': ['app/client/styles/style.scss'],
        },
      },
      prod: {
        options: {
          outputStyle: 'compressed',
        },
        files: {
          'app/public/css/style.css': ['app/client/styles/style.scss'],
        },
      },
    },
    postcss: {
      options: {
        map: true,
      },
      dev: {
        options: {
          processors: [
            require('postcss-normalize')(),
            require('autoprefixer')({ browsers: 'last 2 versions' }),
          ],
        },
        src: 'app/public/css/style.css',
      },
      prod: {
        options: {
          processors: [
            require('postcss-normalize')(),
            require('autoprefixer')({ browsers: 'last 2 versions' }),
            require('cssnano')(),
          ],
        },
        src: 'app/public/css/style.css',
      },
    },
    eslint: {
      target: ['app/client/scripts/**/*.js'],
    },
    uglify: {
      options: {
        sourceMap: true,
        sourceMapName: 'app/public/js/scripts.js.map',
      },
      dev: {
        options: {
          mangle: false,
          compress: false,
          beautify: true,
        },
        files: {
          'app/public/js/scripts.js': ['app/client/scripts/**/*.js'],
        },
      },
      prod: {
        options: {
          compress: true,
          mangle: true,
        },
        files: {
          'app/public/js/scripts.js': ['app/client/scripts/**/*.js'],
        },
      },
    },
    copy: {
      img: {
        files: [
          {
            expand: true,
            cwd: 'app/client/images/',
            src: '**',
            dest: 'app/public/img/',
            flatten: true,
          },
        ],
      },
    },
    clean: ['app/public'],
    watch: {
      options: {
        livereload: true,
      },
      css: {
        files: 'app/client/styles/**/*.scss',
        tasks: ['sass:dev', 'postcss'],
      },
      js: {
        files: 'app/client/scripts/*.js',
        tasks: ['eslint', 'uglify:dev'],
      },
    },
  });

  grunt.registerTask('dev', [
    'clean',
    'copy',
    'sass:dev',
    'postcss:dev',
    'eslint',
    'uglify:dev',
  ]);
  grunt.registerTask('prod', [
    'clean',
    'copy',
    'sass:prod',
    'postcss:prod',
    'eslint',
    'uglify:prod',
  ]);
  grunt.registerTask('default', ['dev', 'watch']);
};
