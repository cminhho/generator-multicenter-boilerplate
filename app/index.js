var generators = require('yeoman-generator');
module.exports = generators.Base.extend(
	// The name 'constructor' is important here
	constructor: function(){
		// Calling the super constructer is important so our generator is correctly set up
		generators.Base.apply(this, arguments);
		
		// Next, add your custom code
		this.option('coffee'); // This method adds support for a '--coffee' flag
	},
	init: function(){
		this.helperMethod = function(){
			console.log('won\'t be called automatically');
		}
	},
	method1: function(){
		console.log('Method 1 just ran');
	},
	method2: function(){
		console.log('Method 2 just ran');
	}
);