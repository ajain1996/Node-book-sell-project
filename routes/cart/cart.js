var express          = require('express');
var router           = express.Router({ mergeparams: true });
var bodyParser       = require('body-parser');

router.get('/cart', function(req, res){
	res.render('cart/cart');
});

module.exports = router;