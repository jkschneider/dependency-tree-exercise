module.exports = function(grunt) {
    grunt.initConfig({
        jasmine: {
          src: [
            'src/main/resources/web/js/floydWarshall.js'
          ],
          options: {
            vendor: [ // third party includes that are depended on by specs and their SUTs
              'src/main/resources/web/bower_components/d3/d3.min.js',
              'src/main/resources/web/bower_components/webcola/WebCola/cola.v3.min.js'
            ],
            specs: 'src/test/resources/jasmine/**/*.js',
            keepRunner: true
          }
        },
        watch: {
          scripts: {
            files: [
                'src/main/resources/web/js/**/*.js',
                'src/test/resources/jasmine/**/*.js'
            ],
            tasks: ['jasmine'],
            options: {
              spawn: false,
            },
          },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', ['jasmine']);
    grunt.registerTask('default', ['test']);
}