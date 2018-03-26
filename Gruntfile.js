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
          'dist/style.css': ['src/client/styles/style.scss'],
        },
      },
      prod: {
        options: {
          outputStyle: 'compressed',
        },
        files: {
          'dist/style.css': ['src/client/styles/style.scss'],
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
        src: 'dist/style.css',
      },
      prod: {
        options: {
          processors: [
            require('postcss-normalize')(),
            require('autoprefixer')({ browsers: 'last 2 versions' }),
            require('cssnano')(),
          ],
        },
        src: 'dist/style.css',
      },
    },
    eslint: {
      target: ['src/client/scripts/**/*.js'],
    },
    uglify: {
      options: {
        sourceMap: true,
        sourceMapName: 'dist/scripts.js.map',
      },
      dev: {
        options: {
          mangle: false,
          compress: false,
          beautify: true,
        },
        files: {
          'dist/scripts.js': ['src/client/scripts/**/*.js'],
        },
      },
      prod: {
        options: {
          compress: true,
          mangle: true,
        },
        files: {
          'dist/scripts.js': ['src/client/scripts/**/*.js'],
        },
      },
    },
    copy: {
      img: {
        files: [
          {
            expand: true,
            cwd: 'src/client/images/',
            src: '**',
            dest: 'dist/images/',
            flatten: true,
          },
        ],
      },
    },
    clean: ['dist'],
    watch: {
      options: {
        livereload: true,
      },
      css: {
        files: 'src/client/styles/**/*.scss',
        tasks: ['sass:dev', 'postcss'],
      },
      js: {
        files: 'src/client/scripts/*.js',
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
