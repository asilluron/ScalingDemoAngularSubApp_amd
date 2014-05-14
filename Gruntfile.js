/*global require:false*/
module.exports = function (grunt) {
	"use strict";

	var merge = require('deepmerge');

	var plugins = [
		'grunt-confidence',
		'grunt-bower-task',
		'grunt-contrib-concat',
		'grunt-contrib-clean',
		'grunt-contrib-watch',
		'grunt-contrib-requirejs',
		'grunt-karma',
		'grunt-angular-templates',
		'grunt-contrib-yuidoc',
		'grunt-concurrent'
	];
	
	var gruntConfig = {
		pkg: grunt.file.readJSON('package.json'),
		dirs: {
			config: 'config',
			fixtures: 'config/fixtures',
			exports: 'exports',
			app: 'src/blog-content'
		},
		bower: {
			install: {
				options: {
					targetDir: "./src/vendor",
					cleanup: true, //Must leave this as true when using sub-repos that have a sliding tag or if using a branch instead of a tag
					layout: "byComponent"
				}
			}
		},
		confidence: {
			karmalocal: {
				files: {
					'<%= dirs.config %>/karma/index.js': '<%= dirs.config %>/karma.conf.json'
				},
				options: {
					criteria: {
						target: "local"
					},
					amd: false,
					commonJS: true
				}
			},
			karmacd: {
				files: {
					'<%= dirs.config %>/karma/index.js': '<%= dirs.config %>/karma.conf.json'
				},
				options: {
					criteria: {
						target: "jenkins"
					},
					amd: false,
					commonJS: true
				}
			},
			require_testable: {
				files: {
					'<%= dirs.config %>/tmp/main-karma.config.json': '<%= dirs.config %>/require.config.json'
				},
				options: {
					criteria: {
						target: "test"
					},
					amd: false
				}
			},
			require_prod: {
				files: {
					'<%= dirs.config %>/requirejs/main-prod.config.js': '<%= dirs.config %>/require.config.json'
				},
				options: {
					criteria: {
						target: "production"
					},
					amd: false,
					commonJS: true
				}
			},
			prodconfig: {
				files: {
					'<%= dirs.app %>/config.js': '<%= dirs.config %>/app.config.json'
				},
				options: {
					criteria: {
						env: "production"
					},
					amd: true
				}
			},
			testconfig: {
				files: {
					'<%= dirs.app %>/config.js': '<%= dirs.config %>/app.config.json'
				},
				options: {
					criteria: {
						env: "nonproduction"
					},
					amd: true
				}
			}
		},
		watch: {
			confidence: {
				files: ['<%= dirs.config %>/*.json'],
				tasks: ["confidence"]
			}
		},
		karma: {
			local: {
				configFile: 'karma.conf.js',
				runnerPort: 9876,
				autoWatch: true,
				singleRun: false
			}
		},
		concurrent: {
			local: {
				tasks: ["karma:local", "watch:confidence"],
				options: {
					limit: 2,
					logConcurrentOutput: true
				}
			}
		},
		concat: {
			require_test_config: {
				options: {
					banner: "//Auto-Generated, DO NOT EDIT\n"
				},
				src: ["<%= dirs.fixtures %>/test-require-header.js",
					"<%= dirs.config %>/tmp/main-karma.config.json",
					"<%= dirs.fixtures %>/test-require-footer.js"
				],
				dest: "<%= dirs.app %>/main-karma.js"
			}
		},
		requirejs: {
			deploy: {
				options: merge(require("./config/requirejs/main-prod.config.js"), {
					baseUrl: "src/",
					name: "blog-content/app",
					out: "dist/blog-content.js",
					optimize: "none"
				})
			},
			deploy_min: {
				options: merge(require("./config/requirejs/main-prod.config.js"), {
					baseUrl: "src/",
					name: "blog-content/app",
					out: "dist/blog-content.min.js",
					optimize: "uglify"
				})
			}
		}
	};

	grunt.initConfig(gruntConfig);

	for (var i = 0; i < plugins.length; i++) {
		grunt.loadNpmTasks(plugins[i]);
	}


	grunt.registerTask('default', ['local']);

	grunt.registerTask('local', [
		'bower:install',
		'confidence:karmalocal',
		'confidence:require_testable',
		'concat:require_test_config',
		'concurrent:local'
	]);

	grunt.registerTask('deploy', [
		'bower:install',
		'confidence:require_prod',
		'requirejs:deploy',
		'requirejs:deploy_min'
	]);
};