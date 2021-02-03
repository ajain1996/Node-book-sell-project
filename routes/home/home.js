var express          = require('express');
var router           = express.Router({ mergeparams: true });
var SellModel        = require('../../models/Sell/sell');
var SellComment      = require('../../models/Sell/comments');
var authRoute        = require('../../models/auth/user');
var bodyParser       = require('body-parser');
var methodOverride   = require('method-override');
var expressSanitizer = require('express-sanitizer');

router.get('/school', function(req, res){
	SellModel.find({genre: 'School'}, function(err, school){
		if(err){
			console.log('Error');
		} else {
			console.log(school);
			res.render('home/competitive/school', {school: school});
		}
	});
});

router.get('/graduation', function(req, res){
	SellModel.find({genre: 'Engineering'}, function(err, graduation){
		if(err){
			console.log('Error');
		} else {
			res.render('home/competitive/graduation', {graduation: graduation});
		}
	});
});

router.get('/competitive-exams/gate', function(req, res){
	SellModel.find({genre: 'Gate'}, function(err, gate){
		if(err){
			console.log('Error');
		} else {
			res.render('home/competitive/gate', {gate: gate});
		}
	});
});

router.get('/competitive-exams/iit-jee', function(req, res){
	SellModel.find({genre: 'IIT-JEE'}, function(err, jee){
		if(err){
			console.log('Error');
		} else {
			res.render('home/competitive/iitjee', {jee: jee});
		}
	});
});

router.get('/competitive-exams/indian-engineering-services', function(req, res){
	SellModel.find({genre: 'IES'}, function(err, ies){
		if(err){
			console.log('Error');
		} else {
			res.render('home/competitive/ies', {ies: ies});
		}
	});
});

// =============================================================================================
// ================================ Government Exams ==========================================
// =============================================================================================

router.get('/government-exams/upsc', function(req, res){
	SellModel.find({genre: 'UPSC'}, function(err, upsc){
		if(err){
			console.log('Error');
		} else {
			res.render('home/government/upsc', {upsc: upsc});
		}
	});
});

router.get('/government-exams/mppsc', function(req, res){
	SellModel.find({genre: 'MPPSC'}, function(err, mppsc){
		if(err){
			console.log('Error');
		} else {
			res.render('home/government/mppsc', {mppsc: mppsc});
		}
	});
});

router.get('/government-exams/psc', function(req, res){
	SellModel.find({genre: 'PSC'}, function(err, psc){
		if(err){
			console.log('Error');
		} else {
			res.render('home/government/psc', {psc: psc});
		}
	});
});

router.get('/government-exams/ssc', function(req, res){
	SellModel.find({genre: 'IES'}, function(err, ssc){
		if(err){
			console.log('Error');
		} else {
			res.render('home/government/ssc', {ssc: ssc});
		}
	});
});

router.get('/government-exams/ias', function(req, res){
	SellModel.find({genre: 'IAS'}, function(err, ias){
		if(err){
			console.log('Error');
		} else {
			res.render('home/government/ias', {ias: ias});
		}
	});
});

router.get('/government-exams/railway', function(req, res){
	SellModel.find({genre: 'IES'}, function(err, railway){
		if(err){
			console.log('Error');
		} else {
			res.render('home/government/railway', {railway: railway});
		}
	});
});

module.exports = router;