var mongoose = require('mongoose');

var sellSchema = new mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	genre:{
		type: String
	},
	description:{
		type: String
	},
	author_name:{
		type: String,
		required: true
	},
	publisher:{
		type: String
	},
	pages:{
		type: String
	},
	image:{
		type: String
	},
	sellingPrice:{
		type: String
	},
	originalPrice:{
		type: String
	},
	create_date:{
		type: Date,
		default: Date.now
	},
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		name: String
	},
	sellcomments: [
	   {
		   type: mongoose.Schema.Types.ObjectId,
		   ref: 'SellComment'
	   }
	]
});

var SellModel = mongoose.model('SellModel', sellSchema);

module.exports = SellModel;