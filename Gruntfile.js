/*global module:false*/
module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    },
    responsive_images: {
      dev: {
        options: {
          sizes: [{
            width: 480,
            quality: 50
          }, {
            width: 640,
            quality: 50
          }, {
            width: 720,
            quality: 50
          }, {
            width: 960,
            quality: 50
          }, {
            width: 1280,
            quality: 50
          }, {
            width: 1440,
            quality: 50
          }, {
            width: 1920,
            quality: 50
          }, {
            width: 2560,
            quality: 50
          }]
        },
        files: [{
          expand: true,
          src: ['mountain.jpg'],
          cwd: 'src/images/',
          dest: 'dist/images/'
        }]
      },
      project: {
        options: {
          sizes: [{
            width: 300,
            quality: 50
          }, {
            width: 360,
            quality: 50
          }, {
            width: 480,
            quality: 50
          }, {
            width: 600,
            quality: 50
          }, {
            width: 640,
            quality: 50
          }, {
            width: 720,
            quality: 50
          }, {
            width: 960,
            quality: 50
          }, {
            width: 1280,
            quality: 50
          }, {
            width: 1440,
            quality: 50
          }, {
            width: 1920,
            quality: 50
          }]
        },
        files: [{
          expand: true,
          src: ['forest.jpg', 'mushroom.jpg', 'frog.jpg'],
          cwd: 'src/images/',
          dest: 'dist/images/'
        }]
      }
    },
    clean: {
      dev: {
        src: ['dist/images/']
      }
    },
    copy: {
      dev: {
        files: [{
          expand: true,
          src: ['src/index.html'],
          dest: 'dist/',
          flatten: true
        }, {
          expand: true,
          src: ['css/*'],
          cwd: 'src/',
          dest: 'dist/'
        }]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-responsive-images');

  // Default task.
  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
  grunt.registerTask('image', ['clean', 'copy', 'responsive_images']);
  grunt.registerTask('copyhtml', ['copy']);

};