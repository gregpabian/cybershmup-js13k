var fs = require('fs');

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

    base64: {
      build: {
        files: {
          '<%= build %>f.64': ['<%= src %>img/f.png'],
          '<%= build %>l.64': ['<%= src %>img/l.png']
        }
      }
    },

    clean: {
      build: ['<%= build %>'],
      dist: ['<%= dist %>'],
      postbuild: [
        '<%= build %>game.min.js',
        '<%= build %>style.min.css',
        '<%= build %>sprites.js',
        '<%= build %>f.64',
        '<%= build %>l.64'
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
        dest: '<%= build %>game.min.js'
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

    glsl: {
      build: {
        options: {
          oneString: true,
          optimize: false,
          stripComments: true
        },
        files: {
          '<%= src %>js/_shaders.js': buildShaderSources()
        }
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

    injectImages: {
      build: {
        src: ['<%= build %>f.64', '<%= build %>l.64'],
        dest: '<%= src %>js/_images.js'
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
          '(function (document, window, undefined) {\n\t"use strict";\n',
          '\n} )(document, this);'
        ]
      },
      build: {
        src: ['<%= concat.build.dest %>'],
        dest: '<%= concat.build.dest %>'
      }
    }
  });

  grunt.registerMultiTask('injectImages', 'Injects base64 images as variables into a JS file', function () {
    var src = [].concat(this.data.src);
    var dest = this.data.dest;
    var done = this.async();
    var contents = {};
    var namePattern = /\/([^.]+)\.64/;

    function nextFile() {
      var file = src.pop();

      if (file) {
        fs.readFile(file, function (err, content) {
          if (err) {
            throw err;
          }

          var match = namePattern.exec(file);
          contents[match[1]] = content;
          nextFile();
        });
      } else {
        var fileContent = '';

        for (file in contents) {
          fileContent += 'var ' + file + 'Image = "data:image/png;base64,' + contents[file] + '";\n';
        }

        fs.writeFile(dest, fileContent, 'UTF-8', function (err) {
          if (err) {
            throw err;
          }

          done();
        });
      }
    }

    nextFile();
  });

  grunt.registerTask('images', ['base64', 'injectImages']);

  grunt.registerTask('lint', ['jshint', 'csslint']);

  grunt.registerTask('dev', [
    'images', 'glsl', 'lint', 'clean:build', 'concat', 'strip_code', 'wrap', 'cssmin',
    'htmlrefs', 'clean:postbuild'
  ]);

  grunt.registerTask('build', [
    'images', 'glsl', 'lint', 'clean:build', 'concat', 'strip_code', 'wrap',
    'closure-compiler', 'cssmin', 'htmlrefs', 'htmlmin', 'clean:postbuild'
  ]);

  grunt.registerTask('dist', ['clean:dist', 'compress']);

  grunt.registerTask('default', ['build', 'dist']);

  function buildSources() {
    var scriptPattern = /script src="([^"]+)/g,
      html = fs.readFileSync(src + 'index.html').toString(),
      scripts = [],
      match;

    while ((match = scriptPattern.exec(html))) {
      // if (match[1] !== 'lib/stats.js') {
      scripts.push('<%= src %>' + match[1]);
      // }
    }

    return scripts;
  }

  function buildShaderSources() {
    var files = fs.readdirSync(src + 'shaders/');

    return files.map(function (file) {
      return '<%= src %>shaders/' + file;
    });
  }
};