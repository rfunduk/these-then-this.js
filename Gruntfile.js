module.exports = function( grunt ) {
  grunt.loadNpmTasks( 'grunt-mocha' );
  grunt.loadNpmTasks( 'grunt-contrib-copy' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-replace' );

  grunt.initConfig( {
    pkg: grunt.file.readJSON( 'package.json' ),
    mocha: {
      test: {
        src: [ 'test/runner.html' ],
        options: {
          mocha: { ignoreLeaks: false },
          reporter: 'Spec'
        }
      }
    },
    copy: {
      dist: {
        files: [ { src: 'ttt.js', dest: 'site/' },
                 { src: 'ttt.js', dest: 'site/inline/' } ]
      }
    },
    replace: {
      dist: {
        options: {
          usePrefix: false,
          patterns: [
            {
              match: /<!-- code (.+?) -->/g,
              replacement: function( match, filename ) {
                console.log( arguments );
                return [
                  "<div class='results' id='" + filename + "'><a href='javascript:void(0);'>done</a></div>",
                  "<pre class='highlight' data-results='" + filename + "' data-src='" + filename + ".js'><code>",
                  grunt.file.read( 'site/inline/' + filename + '.js' ).trim(),
                  "</code></pre>"
                ].join('');
              }
            }
          ]
        },
        files: [
          { src: ['site/.index.html'], dest: 'site/index.html'}
        ]
      }
    },
    watch: {
      dev: {
        files: [ 'Gruntfile.js', 'ttt.js', 'site/.index.html', 'site/inline/*' ],
        tasks: [ 'build' ]
      },
      test: {
        files: [ 'ttt.js', 'test/*' ],
        tasks: [ 'test' ]
      }
    }
  } );

  grunt.registerTask( 'test', [ 'mocha' ] );
  grunt.registerTask( 'build', [ 'copy', 'replace' ] );
  grunt.registerTask( 'default', [ 'test', 'build' ] );
};
