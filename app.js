const express          = require('express');
const mongoose         = require('mongoose');
const passport         = require('passport');
const flash            = require('connect-flash');
const session          = require('express-session');
const methodOverride   = require('method-override');
const bodyParser       = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const path             = require('path');
const multer           = require('multer');
const Sequelize        = require('sequelize');
const Op               = Sequelize.Op;

const app = express({mergeparams: true});

// requiring sell routes
var SellRoute = require('./routes/sell/sell');
var RentRoute = require('./routes/rent/rent');
var HomeRoute = require('./routes/home/home');
var PurchaseRoute = require('./routes/purchase/purchase');

// requiring sell Model
var SellModel = require('./models/Sell/sell');

// requiring user routes
var userRoute = require('./routes/auth/users');

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').MongoURI;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/BookShell_DB', { useNewUrlParser: true });
/*
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
*/

// EJS
app.set("view engine", "ejs");
//app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
//app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use(SellRoute);
app.use(RentRoute);
app.use(PurchaseRoute);
app.use(userRoute);
app.use(HomeRoute);

// ============================================ Selldata =========================================

var selldata = [
   {
	   name: 'IIT JEE Mains & advance(Gurukul)',
	   image: 'img/cover/cover-1.jpg',
	   text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software.",
	   sellingPrice: '10$',
	   originalPrice: '12$',
	   stock: '1'
   },
   {
	   name: 'IIT JEE Elective Prepairation',
	   image: 'img/cover/cover-2.jpg',
	   text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software.",
	   sellingPrice: '10$',
	   originalPrice: '12$',
	   stock: '1'
   },
   {
	   name: 'IIT JEE recomended books',
	   image: 'img/cover/cover-3.jpg',
	   text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software.",
	   sellingPrice: '10$',
	   originalPrice: '12$',
	   stock: '1'
   },
   {
	   name: 'GATE study material(2019)',
	   image: 'img/cover/cover-4.jpg',
	   text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software.",
	   sellingPrice: '10$',
	   originalPrice: '12$',
	   stock: '1'
   },
   {
	   name: 'March of the Indian Economy',
	   image: 'img/cover/cover-5.jpg',
	   text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software.",
	   sellingPrice: '10$',
	   originalPrice: '12$',
	   stock: '1'
   },
   {
	   name: 'Best recomended book for GATE',
	   image: 'img/cover/cover-6.jpg',
	   text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software.",
	   sellingPrice: '10$',
	   originalPrice: '12$',
	   stock: '1'
   },
   {
	   name: 'Best recomended book for GATE',
	   image: 'img/cover/cover-7.jpg',
	   text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software.",
	   sellingPrice: '10$',
	   originalPrice: '12$',
	   stock: '1'
   },
   {
	   name: 'Best recomended book for GATE',
	   image: 'img/cover/cover-8.jpg',
	   text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software.",
	   sellingPrice: '10$',
	   originalPrice: '12$',
	   stock: '1'
   }
];

app.get('/', function(req, res){
	res.render('home/home', {selldata: selldata});
});

app.get('/user/profile', isLoggedIn, function(req, res){
	SellModel.find({}, function(err, profile){
		if(err){
			console.log('Error');
		} else {
			res.render('auth/profile', {profile: profile});
		}
	});
});

app.get('/about', function(req, res){
	res.render('home/about');
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/login');
	}
}

// ===============================================================================================

const PORT = process.env.PORT || 4020;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
