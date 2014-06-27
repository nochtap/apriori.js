module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-uglify');
 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: './'
                }
            }
        },
        typescript: {
            base: {
                src: ['**/*.ts'],
                dest: 'apriori.js',
                options: {
                    module: 'amd',
                    target: 'es5'
                }
            }
        },
        watch: {
            files: '**/*.ts',
            tasks: ['typescript']
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*.js']
            }
        },
        open: {
            dev: {
                path: 'http://localhost:8080/index.html'
            }
        },
        uglify: {
            my_target: {
                files: {
                    'apriori.min.js': ['apriori.js']
                }
            }
        }
    });
 
    grunt.registerTask('test',    ['typescript', 'mochaTest']);
    grunt.registerTask('build',   ['typescript', 'test', 'uglify']);
    grunt.registerTask('default', ['typescript', 'connect', 'open', 'watch']);
 
}

