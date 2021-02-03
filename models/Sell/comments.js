var mongoose = require('mongoose');
var dateFormat       = require('dateformat');
var moment           = require('moment');
var now              = new Date();
dateFormat("Jun 9 2007", "fullDate");

var sellCommentSchema = new mongoose.Schema({
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		name: String
	},
	create_date:{
		type: Date,
		default: Date.now
	},
	text: String
});

var SellComment = mongoose.model('SellComment', sellCommentSchema);
module.exports = SellComment;