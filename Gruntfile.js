module.exports = function(grunt) {

  var buildInfo = {
    projectName: 'vr-frontend-test',
    version: function () {
      var package = grunt.file.readJSON('package.json');
      return package.version;
    },
    serverPort: '4200'
  };
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    exec: { // exec tasks
      httpServer: {     // localhost:4200/src  or  localhost:4200/dist
        cmd: 'http-server -p ' + buildInfo.serverPort + ' -o'
      }
    },
    sass: { // sass tasks
      ToSrc: {
        options: {
          style: 'expanded' // we don't want to compress it
        },
        files: {
          'src/css/max-640.css': 'src/sass/max-640.scss', // dest - src
          'src/css/max-1024.css': 'src/sass/max-1024.scss',
          'src/css/max-1400.css': 'src/sass/max-1400.scss',
          'src/css/main.css': 'src/sass/main.scss'
        }
      },
      ToDist: {
          options: {
              style: 'compressed' // compress it
          },
          files: {
              'dist/css/max-640.css': 'src/sass/max-640.scss',
              'dist/css/max-1024.css': 'src/sass/max-1024.scss',
              'dist/css/max-1400.css': 'src/sass/max-1400.scss',
              'dist/css/main.css': 'src/sass/main.scss'
          }
      }
    },
    watch: { // watch task
      sass: {   // live compile sass files
        files: ['src/sass/*.scss'],
        tasks: ['sass:ToSrc']
      }
    },
    uglify: { // uglify
        dev: {
            options: {
                compress: { // with console.*
                    drop_console: false
                }
            },
            files: {
                'dist/index.js': ['src/index.js']
            }
        },
        prod: {
            options: {
                compress: { // without console.*
                    drop_console: true
                }
            },
            files: {
                'dist/index.js': ['src/index.js']
            }
        }
    },
    copy: { //copy task
        toDist: {
            files: [{
                expand: true,
                cwd: 'src',
                src: ['**','!**/sass/**'],  //exclude sass folder
                dest: 'dist/'
            }]
        }
    }
  });


  grunt.registerTask('setConfig', function(environment) {
    if (environment !== ('prod') && environment !== ('dev')) {
      grunt.log.writeln('Environment:', environment);
      grunt.fail.warn('Usage: insert environment! current:', environment);
    }
    grunt.config('environment', environment);
    grunt.log.writeln('Environment: '['blue'] + grunt.config.get('environment')['rainbow'].bold);
  });

  // Load the plugin.
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // task(s).
  // test servers in localhost:4200, execute in order
  grunt.registerTask('watch-sass', ['watch:sass']);
  grunt.registerTask('server', ['sass:ToSrc','exec:httpServer']);

  // Deploy tasks to dist/ folder
  grunt.registerTask('build-dev', ['setConfig:dev', 'sass:ToDist','copy:toDist', 'uglify:dev']);    // set environment, process sass, copy files from src to dist, minifing js(with console.log)
  grunt.registerTask('build-prod', ['setConfig:prod', 'sass:ToDist', 'copy:toDist', 'uglify:prod']);// set environment, process sass, copy files from src to dist, minifing js(without console.log)


};
