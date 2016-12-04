module.exports = function (grunt) {
	
	
	grunt.initConfig({
		
		nick: 'poker-ui',
		pkg: grunt.file.readJSON('package.json'),
		
		clean: {
			build: ['build/'],
		},
		
		copy: {
			build: {
				src: 'src/**/css/*.css',
				dest: 'build/css/',
				expand: true,
				flatten: true
			},
			
			buildJS: {
				src: 'src/**/js/*.js',
				dest: 'build/js/',
				expand: true,
				flatten: true
			},
			
			release: {
				src: '{LICENSE.md}',
				dest: 'build/'
			}
		},
		
		concat: {
			build: {
				files: [
					{
						'build/css/buttons.css': [
							'build/css/buttons-core.css',
							'build/css/buttons.css'
						]
					}
				]
			}
		}
		
	});
	
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	
	grunt.registerTask('default', ['build']);
	
	grunt.registerTask('build', [
		'clean:build',
		'copy:build',
		'copy:buildJS',
		'concat:build'
	]);
};