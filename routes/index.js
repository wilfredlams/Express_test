var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var id = mongoose.Types.ObjectId();

//database schema
var Schema = mongoose.Schema;
var userSchema = new Schema({
username : String,
email : String
});

var User = mongoose.model('User', userSchema);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello World!' });
});


/* POST to Add User */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = mongoose.connection;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;
	
	//insert to database
	var a = new User({
    username : userName,
    email : userEmail
    });
 
    a.save(function (err, data) {
		
    if (err) {
		// If it failed, return error
	console.log(err);
	res.send("There was a problem adding the information to the database.");
	}
    else {
		// And forward to success page
		console.log('Saved : ', data );
	    res.redirect("userlist");
      }
	  });
});


/* POST to Edit User */
router.post('/edituser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});


/* GET to Delete User */
router.get('/deleteuser', function(req, res) {

    // Set our internal DB variable
    //var db = req.db;

    // Get our form values. These rely on the "name" attributes
    //var userName = req.body.username;
    //var userEmail = req.body.useremail;

  // User.update({ userName: "wilfred"}, { $unset: { field: 1 }}, callback);
  
//});

User.findOneAndUpdate({$pull: {userName: 'wilfred'}}, function(err, data){
        if(err) {
          return res.status(500).json({'error' : 'error in deleting address'});
        }

        res.json(data);

      });


});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
	
	});
	
	
/* GET Post page. */
router.get('/post', function(req, res) {
    res.render('post', { title: 'Post Check' });
});
		
	
/* GET Userlist page. */
router.get('/userlist', function(req, res) {

var User = mongoose.model('User', userSchema);

        User.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
			
			});
    });
});



/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});


module.exports = router;

