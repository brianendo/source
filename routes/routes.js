var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// Create signup page
router.post('/signup', function(req, res){
  User.findOne({ username : req.body.username }, function(err, user) {
    if (user != null) {
      res.redirect('/?alert=2')
    } else {
      newUser = new User({ local: { email: req.body.email, password: req.body.password }, name: { first: req.body.firstname, last: req.body.lastname}, username: req.body.username});
      newUser.save(function(err, result){
        console.log("Added user")
        res.redirect('/posts')
      });
    }
  });
});


// Get signup page
router.get('/signup', function(req, res){
  res.render('signup.ejs');
});



// User Routes
var User = require('../models/user')

// Get all users
router.get('/users', function(req, res){
  User.find(function(err, users){
    res.json(users);
  });
});

// Find user by id
router.get('/user/:id', function(req, res){
  User.findById(req.params.id, function(err, user){
    res.json(user);
  });
});

router.post('/users', function(req, res) {
	User.create(req.body, function (err, post){
		if (err) return next(err);
		res.json(post);
	});
});





// Post Routes
var Post = require('../models/post.js');

/* GET /posts listing */
router.get('/posts', function(req, res, next) {
	Post.find(function (err, posts) {
		if (err) return next(err);
		res.json(posts);
	});
});

/* POST /posts */
router.post('/posts', function(req, res, next) {
	Post.create(req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

/* GET /post/id */
router.get('/post/:id', function(req, res, next) {
	Post.findById(req.params.id, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

/* PUT /post/:id */
router.put('/post/:id', function(req, res, next) {
	Post.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

/* DELETE /post/:id */
router.delete(':/post/id', function(req, res, next) {
	Post.findByIdAndRemove(req.params.id, req.body, function(err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

module.exports = router;