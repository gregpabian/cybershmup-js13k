module.exports = function(grunt) {
  require('google-closure-compiler').grunt(grunt);
  require('load-grunt-tasks')(grunt);

  var src = 'src/';
  var build = 'build/';
  var dist = 'dist/';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    src: src,
    build: build,
    dist: dist,
    sources: buildSources(),

    clean: {
      build: ['<%= build %>'],
      dist: ['<%= dist %>'],
      postbuild: [
        '<%= build %>game.js',
        '<%= build %>game.min.js',
        '<%= build %>style.min.css',
        '<%= build %>sprites.js'
      ]
    },

    'closure-compiler': {
      build: {
        files: {
           '<%= build %>game.min.js': ['<%= wrap.build.dest %>']
        },
        options: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          language_in: 'ECMASCRIPT5_STRICT'
        }
      }
    },

    compress: {
      dist: {
        options: {
          archive: '<%= dist %><%= pkg.name %>.zip',
          level: 9
        },
        files: [{
          cwd: '<%= build %>',
          src: '**',
          expand: true
        }]
      }
    },

    concat: {
      options: {
        separator: '\n\n'
      },
      build: {
        src: '<%= sources %>',
        dest: '<%= build %>game.js'
      }
    },

    copy: {
      sprite: {
        files: [{
          cwd: '<%= build %>',
          src: 'sprites.js',
          dest: '<%= src %>js/',
          expand: true
        }, {
          cwd: '<%= build %>',
          src: 'sprites.png',
          dest: '<%= src %>',
          expand: true
        }]
      }
    },

    csslint: {
      options: {
        ids: false,
      },
      lint: {
        src: ['<%= src %>style.css']
      }
    },

    cssmin: {
      build: {
        src: '<%= src %>style.css',
        dest: '<%= build %>style.min.css'
      }
    },

    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      build: {
        src: '<%= htmlrefs.build.dest %>',
        dest: '<%= htmlrefs.build.dest %>'
      }
    },

    htmlrefs: {
      options: {
        includes: {
          source: '<%= build %>game.min.js'
        }
      },
      build: {
        src: '<%= src %>index.html',
        dest: '<%= build %>index.html'
      }
    },

    imagemin: {
      build: {
        src: '<%= build %>sprites.png',
        dest: '<%= build %>sprites.png'
      }
    },

    jshint: {
      options: {
        sub: true,
        elision: true
      },
      lint: {
        src: ['gruntfile.js', '<%= src %>js/**/*.js']
      }
    },

    sprite: {
      build: {
        src: ['<%= src %>img/*.png'],
        dest: '<%= build %>sprites.png',
        destCss: '<%= build %>sprites.js',
        cssTemplate: function(data) {
          var sprites = {};

          data.sprites.forEach(function(sprite) {
            sprites[sprite.name.replace(/\d+/, '')] = [
              sprite.x, sprite.y,
              sprite.width, sprite.height
            ];
          });

          return 'var sprites = ' + JSON.stringify(sprites) + ';';
        }
      }
    },
    
    strip_code: {
      options: {
        blocks: [{
          start_block: '/* dev */',
          end_block: '/* end-dev */'
        }]
      },
      build: {
        src: '<%= concat.build.dest %>'
      }
    },

    wrap: {
      options: {
        wrapper: [
          '( function ( document, window, undefined ) {\n\t\'use strict\';\n',
          '\n} )( document, this );'
        ]
      },
      build: {
        src: ['<%= concat.build.dest %>'],
        dest: '<%= concat.build.dest %>'
      }
    }
  });

  grunt.registerTask('lint', ['jshint', 'csslint']);

  grunt.registerTask('build', [
    'lint', 'clean:build', /*'sprite', 'copy:sprite',*/ 'concat', 'strip_code', 'wrap',
    'closure-compiler', 'cssmin', 'htmlrefs', 'htmlmin', /*'imagemin',*/ 'clean:postbuild'
  ]);

  grunt.registerTask('dist', ['clean:dist', 'compress']);

  grunt.registerTask('default', ['build', 'dist']);

  function buildSources() {
    var fs = require('fs'),
      scriptPattern = /script src="([^"]+)/g,
      html = fs.readFileSync(src + 'index.html').toString(),
      scripts = [],
      match;

    while ((match = scriptPattern.exec(html))) {
      scripts.push('<%= src %>' + match[1]);
    }

    return scripts;
  }
};