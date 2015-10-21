var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var mongoose = require('mongoose');


router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res) {
    res.render('signup');
});

router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
        if (err) {
            return res.render('signup');
        }

        passport.authenticate('local')(req, res, function () {
            console.log("Added User");
            res.redirect('/',{ title: 'Express' });
        });
    });
});

router.get('/login', function(req, res) {
    res.render('index',{ title: 'Express' });
});


router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.status(500).json({err: err});
    }
    if (!user) {
      return res.status(401).json({err: info});
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'});
      }
      res.status(200).json({status: 'Login successful!'});
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

/* GET home page. */
// router.get('/', function(req, res) {
//   res.render('index', { title: 'Express' });
//   // res.sendFile(path.join(__dirname+'/home.html'));
//   // res.sendFile("home.html");
// });


router.get('/home', function(req, res) {
  res.sendFile(path.join("/Users/brianendo/Desktop/Source/public/home.html"));
  // res.sendFile("home.html");
});

router.get('/post', function(req, res) {
  res.sendFile(path.join("/Users/brianendo/Desktop/Source/public/post.html"));
  // res.sendFile("home.html");
});

router.get('/angular', function(req, res) {
  res.sendFile(path.join("/Users/brianendo/Desktop/Source/public/homefeed.html"));
  // res.sendFile("home.html");
});


// // Create signup page
// router.post('/signup', function(req, res){
//   User.findOne({ username : req.body.username }, function(err, user) {
//     if (user != null) {
//       res.redirect('/?alert=2')
//     } else {
//       newUser = new User({ local: { email: req.body.email, password: req.body.password }, name: { first: req.body.firstname, last: req.body.lastname}, username: req.body.username});
//       newUser.save(function(err, result){
//         console.log("Added user");
//         res.redirect('/');
//       });
//     }
//   });
// });


// Get signup page
router.get('/signup', function(req, res){
  res.render('signup.ejs');
});



// User Routes
var User = require('../models/user')

// Get all users
router.get('/api/users', function(req, res){
  User.find(function(err, users){
    res.json(users);
  });
});

// Find user by id
router.get('/api/users/:id', function(req, res){
  User.findById(req.params.id, function(err, user){
    res.json(user);
  });
});

router.post('/api/users', function(req, res) {
	User.create(req.body, function (err, post){
		if (err) return next(err);
		res.json(post);
	});
});





// Post Routes
var Post = require('../models/post.js');

router.get('/api/postsordered', function(req, res, next) {
	var posts = Post.find().sort({created_at:-1}).limit(5);
	posts.exec(function(err, results) {
    if (err) { 
    }
    else if (results.length == 0) {
    }
    else {
    	res.json(results);
        results.reverse(); // put the results into the desired order
        results.forEach(function(result) {
            // do something with each result
        });
    }
});
});

/* GET /posts listing */
router.get('/api/posts', function(req, res, next) {
	Post.find(function (err, posts) {
		if (err) return next(err);
		// Post.find().sort({x:1});
		res.json(posts);
	});
});

/* POST /posts */
router.post('/api/posts', function(req, res, next) {
	Post.create(req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

/* GET /post/id */
router.get('/api/posts/:id', function(req, res, next) {
	Post.findById(req.params.id, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

/* PUT /post/:id */
router.put('/api/posts/:id', function(req, res, next) {
	Post.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

/* DELETE /post/:id */
router.delete('/api/posts/:id', function(req, res, next) {
	Post.findByIdAndRemove(req.params.id, req.body, function(err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

router.delete('/api/posts/', function(req, res, next) {
	Post.remove(function(err,removed) {

   // where removed is the count of removed documents
	});
});

module.exports = router;