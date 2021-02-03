var express          = require('express');
var router           = express.Router({ useNewUrlParser: true });
var PurchaseModel    = require('../../models/purchase/purchase');
var bodyParser       = require('body-parser');
var methodOverride   = require('method-override');
var expressSanitizer = require('express-sanitizer');

//=============================== Purchase Routes =============================================

router.get('/purchase', function(req, res){
	res.render('purchase/purchase');
});

router.get('/purchase/:id3', function(req, res){
	res.render('purchase/purchaseShow');
});

module.exports = router;