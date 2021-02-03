var express          = require('express');
var router           = express.Router({ mergeparams: true });
var SellModel        = require('../../models/Sell/sell');
var SellComment      = require('../../models/Sell/comments');
var authRoute        = require('../../models/auth/user');
var bodyParser       = require('body-parser');
var methodOverride   = require('method-override');
var expressSanitizer = require('express-sanitizer');
var dateFormat       = require('dateformat');
var moment           = require('moment');
var now              = new Date();
dateFormat("Jun 9 2007", "fullDate");
//=============== Sell Routes ==================

/*
router.get('/sell', function(req, res){
	SellModel.find({}, function(err, sellData){
		if(err){
			console.log('Error');
		} else {
			res.render('sell/sell', {sellData: sellData});
		}
	});
});
*/

// Define escapeRegex function for search feature
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

router.get('/sell', function(req, res){
	if(req.query.search) {
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      // Get all campgrounds from DB
      SellModel.find({title: regex}, function(err, sellData){
		if(err){
			console.log('Error');
		} else {
			res.render('sell/sell', {sellData: sellData});
		}
	});
  } else {
      // Get all campgrounds from DB
      SellModel.find({}, function(err, sellData){
		if(err){
			console.log('sellError');
		} else {
			res.render('sell/sell', {sellData: sellData});
		}
	});
  }
});

router.post('/sell', function(req, res){
	//console.log(req.body.sells.Pname);
	var title = req.body.sell.title;
    var image = req.body.sell.image;
	var genre = req.body.sell.genre;
	var pages = req.body.sell.pages;
	var publisher = req.body.sell.publisher;
	var author_name = req.body.sell.author_name;
	var description = req.body.sell.description;
	var sellingPrice = req.body.sell.sellingPrice;
	var originalPrice = req.body.sell.originalPrice;
	var author = {
		id: req.user._id,
		name: req.user.name
	}
	var newCreated = {title: title, image: image, publisher: publisher, author_name: author_name, genre: genre, pages: pages, description: description, sellingPrice: sellingPrice, originalPrice: originalPrice, author, author};
	SellModel.create(newCreated, function(err, newSell){
		if(err){
			console.log('Error');
		} else {
			res.redirect('/sell');
		}
	});
});

router.get('/sell/new', isLoggedIn, function(req, res){
	res.render('sell/new');
});

router.get('/sell/:id', function(req, res){
	SellModel.findById(req.params.id).populate('sellcomments').exec(function(err, sellId){
		if(err){
			console.log('Error');
		} else {
			res.render('sell/show', {sellId: sellId, moment: moment});
		}
	});
});

router.get('/sell/:id/edit', CheckSellOwnerShip, function(req, res){
	SellModel.findById(req.params.id, function(err, editSell){
		res.render('sell/edit', {editSell: editSell});
	});
});

router.put('/sell/:id', CheckSellOwnerShip, function(req, res){
	SellModel.findByIdAndUpdate(req.params.id, req.body.sell, function(err, updatedSell){
		if(err){
			console.log('ERROR');
		} else {
			res.redirect('/sell/' + req.params.id);
		}
	});
});

router.delete('/sell/:id', CheckSellOwnerShip, function(req, res){
	SellModel.findByIdAndDelete(req.params.id, function(err){
		if(err){
			console.log('ERROR');
		} else {
			res.redirect('/sell');
		}
	});
});

router.get('/sell/:id/comments/new', isLoggedIn, function(req, res){
	SellModel.findById(req.params.id, function(err, commentdata){
		if(err){
			console.log('ERROR');
		} else {
			res.render('comments/sell/new', {commentdata: commentdata});
		}
	});
});

router.post('/sell/:id/comments', isLoggedIn, function(req, res){
	SellModel.findById(req.params.id, function(err, commentdata){
		if(err){
			console.log('ERROR');
		} else {
			SellComment.create(req.body.commentE, function(err, comment){
				if(err){
					console.log('ERROR');
				} else {
					//add Username here in comment
					comment.author.id = req.user._id;
					comment.author.name = req.user.name;
					comment.save();
					commentdata.sellcomments.push(comment);
					commentdata.save();
					res.redirect('/sell/' + commentdata._id);
				}
			});
		}
	});
});

router.get('/sell/:id/comments/:comment_id/edit', CheckCommentOwnerShip, function(req, res){
	SellComment.findById(req.params.comment_id, function(err, editComment){
		if(err){
			console.log('Error');
		} else {
			res.render('comments/sell/edit', {sell_id: req.params.id, comment: editComment});
		}
	});
});
router.put('/sell/:id/comments/:comment_id', CheckCommentOwnerShip, function(req, res){
	SellComment.findByIdAndUpdate(req.params.comment_id, req.body.commentE, function(err, updatedcomment){
		if(err){
			console.log('Error');
		} else {
			res.redirect('/sell/' + req.params.id);
		}
	});
});

router.delete('/sell/:id/comments/:comment_id', CheckCommentOwnerShip, function(req, res){
	SellComment.findByIdAndDelete(req.params.comment_id, function(err){
		if(err){
			console.log('Error');
		} else {
			res.redirect('/sell/' + req.params.id);
		}
	});
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/login');
	}
}

function CheckSellOwnerShip(req, res, next){
	if(req.isAuthenticated()){
		SellModel.findById(req.params.id, function(err, editSell){
			if(err){
				console.log('Error');
			} else {
				if(editSell.author.id.equals(req.user._id)){
					next();
				} else {
					console.log('You do not have permission');
					res.redirect('back');
				}
			}
		});
	} else {
		res.redirect('back');
	}
}

function CheckCommentOwnerShip(req, res, next){
	if(req.isAuthenticated()){
		SellComment.findById(req.params.comment_id, function(err, editComment){
			if(err){
				console.log('Error');
			} else {
				if(editComment.author.id.equals(req.user._id)){
					next();
				} else {
					console.log('You do not have permission');
					res.redirect('back');
				}
			}
		});
	} else {
		res.redirect('back');
	}
}

module.exports = router;