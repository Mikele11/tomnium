require('rootpath')();
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));


app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

// routes
app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));

app.get('/', function (req, res) {
    return res.redirect('/app');
});
app.get('/app', function (req, res) {
    return res.redirect('/product');
});

//var mongojs = require('mongojs');
//var db = mongojs('product', ['product']);
//----------------------------------------mongoose
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/product';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var ProductSchema = new mongoose.Schema({
        name: {type: String},
		price:Number,
        description: {type: String},
        createdBy:String
    },{
		versionKey: false 
	});

var Product = db.model('product', ProductSchema);
//----------------------------------------

app.get('/products', function (req, res) {
  Product.find(function (err, docs) {
    res.json(docs);
  })
});

app.post('/product/new', function (req, res) {
  var product = new Product(req.body);
  product.save(function(err, doc) {
    res.json(doc);
  });
});

app.get('/product/:id', function (req, res) {
  var id = req.params.id;
  Product.findOne({ _id : id}, function (err, doc) {
    res.json(doc);
  })
});

var server = app.listen(3000, function () {
    console.log('Server listening at http://3000');
});