var express          = require('express');
var router           = express.Router({ useNewUrlParser: true });
var RentModel        = require('../../models/rent/rent');
var bodyParser       = require('body-parser');
var methodOverride   = require('method-override');
var expressSanitizer = require('express-sanitizer');

//================================= Rent Routes ===============================================

router.get('/rent', function(req, res){
	res.render('rent/rent');
});

router.get('/rent/:id2', function(req, res){
	res.render('rent/show');
});

module.exports = router;