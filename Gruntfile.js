module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Set up the output diretcory config
    output_dir: 'public/dist',
    // Set up the src directory
    input_dir: 'public/static',
    concat: {
      css: {
        options : {
          separator: '\n'
        },
        src: ['<%=input_dir%>/css/**/*.css'],
        dest: '<%=output_dir%>/css/<%= pkg.name %>.css'
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: '<%=output_dir%>/css',
          src: ['<%= pkg.name %>.css', '!*.min.css'],
          dest: '<%=output_dir%>/css',
          ext: '.min.css'
        }]
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          '<%= output_dir%>/js/main.min.js'  : ['<%=input_dir%>/js/main.js'],
          '<%= output_dir%>/js/server.min.js': ['<%=input_dir%>/js/server.js'],
          '<%= output_dir%>/js/client.min.js': ['<%=input_dir%>/js/client.js']
        }
      }
    },
    clean: {
      uncompressed_js: ["<%=output_dir%>/js/*.js", "!<%=output_dir%>/js/*.min.js"],
      uncompressed_css: ["<%=output_dir%>/css/*.css", "<%=output_dir%>/css/*.pre", "!<%=output_dir%>/css/*.min.css"],
    },
    jshint: {
      files: ['Gruntfile.js', '<%= input_dir%>/js/**/*.js', 'index.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>', '<%= input_dir%>/css/**/*.css'],
      tasks: ['jshint', 'concat', 'uglify', 'cssmin', 'clean']
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
      },
      pre: {
        src : '<%=output_dir%>/css/<%= pkg.name %>.css',
        dest: '<%=output_dir%>/css/<%= pkg.name %>.pre'
      }
    },
    express: {
      options: {
         background: false
      },
      prod: {
        options: {
          script: 'index.js',
          node_env: 'production'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.registerTask('test', 'jshint');
  grunt.registerTask('serve', ['jshint', 'concat', 'uglify', 'cssmin', 'clean', 'express']);
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin', 'clean', 'watch']);
};