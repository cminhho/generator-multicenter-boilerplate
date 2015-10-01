"use strict";
var generators 	= require("yeoman-generator");
var _ 			= require("lodash");
var beautify 	= require("gulp-beautify");
var yosay		= require("yosay");
var chalk		= require("chalk");
var path		= require("path");
var helpers 	= generators.test;

var MultiCenter = generators.Base.extend({
	helper: function(name){
		console.log("won\"t be called automatically" + name);
	},
	installDependencies: function(){
		this.on('end', function() {
            if (!this.options['skip-install']) {
                this.installDependencies();
            }
        });
	},
	scaffoldFolders: function(){
		this.copy('_.bowerrc', '.bowerrc');
		this.mkdir('app/');
		this.mkdir('test/');
		this.mkdir('app/js');
		this.mkdir('app/css');
		this.mkdir('app/assets');
	},
	copyMainFiles: function(){
		
	}
});

module.exports = MultiCenter.extend({
	/*constructor: function(){
		generators.Base.apply(this, arguments);
		this.log(arguments[0]);
	},*/
	initializing: function(){
		this.pkg = require('../package.json');
		
		this.installDependencies();
		//this.helper(this.argument());
	},
	paths: function () {
		this.destinationRoot();
		
		// get the destination context path
		this.log(this.destinationRoot());
		this.destinationPath("index.js");
		
		// get the template context
		this.log(this.sourceRoot());
		//this.templatePath("index.js");
	},
	method2: function () {
		this.log("method 2 just ran");
	},
	prompting: function(){
		var done = this.async();
		
		 // Have Yeoman greet the user.
		this.log(yosay('Welcome to the ' + chalk.red("multicenter boilerplate") + ' generator!'));
		
		var prompts = require('./prompts.json');
		
		this.prompt(prompts, function(answers){
			this.packageTitle	= answers.packageTitle;
			this.packageName 	= this.packageTitle.toLowerCase().replace(/\ /g, '-');
			this.packageDesc 	= answers.packageDesc;
			this.packageVersion = answers.packageVersion;
			done();
		}.bind(this))
	},
	writing1: {
		app: function(){
		
		},
		copyMainFiles: function(){
			
		}
	},
	writing: function(){
		// insert Config
		//this.gruntfile.insertConfig("compass", "{watch: {watch: true}}");
		
		// register Task
		//this.gruntfile.registerTask("build", ["compass", "uglify"]); // output: grunt.registerTask('build', ['compass', 'uglify']);
		
		this.scaffoldFolders();
		this.copyMainFiles();
		var context = {
            package_name: this.packageName,
            package_title: this.packageTitle,
            package_desc: this.packageDesc,
            package_version: this.packageVersion,
            package_url: '',
            package_repo: 'git://.git',
            package_bugs: '/issues',
            full_name: this.packageName
        };
		
		this.config.set('context', context);
		this.config.save();
		
		this.template('_package.json', 'package.json', context);
		this.template("_bower.json", "bower.json", context);
		//this.copy('_Gruntfile.js', 'Gruntfile.js');
		
		/*this.fs.copyTpl(
			this.templatePath("index.html"),
			this.destinationPath("src/index.html"),
			this.registerTransformStream(beautify({indentSize: 2 })),
			{ title: "Templating with yeoman"}
		);*/
		
		this.on('end', function(){
			this.log(chalk.bold.yellow('Be sure to visit ') + chalk.bold.red('https://github.com/yuvalsaraf/generator-bower-package.git') + chalk.bold.yellow('\nand read all about the generator!'));
            chalk.bold.red('https://github.com/yuvalsaraf/generator-bower-package.git')
		});
	},
	install: function(){
		//this.installDependencies();
	},
});










