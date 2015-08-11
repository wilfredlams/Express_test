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


// Set our internal DB variable
var db = mongoose.connection;
	
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello World!' });
});


/* POST to Add User */
router.post('/adduser', function(req, res) {

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

// Get our form values. These rely on the "name" attributes
    var oldName = req.body.oldname;
    var oldEmail = req.body.oldemail;
	var newName = req.body.newname;
    var newEmail = req.body.newemail;

    var User = mongoose.model('User', userSchema);

    User.update({
    username : oldName,
    email : oldEmail
    }, {username : newName,
    email : newEmail
    }
    , function(err, removed){
        console.log(removed);
		res.redirect("userlist");
     });

});


/* POST to Delete User */
router.post('/deleteuser', function(req, res) {

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;
	
    var User = mongoose.model('User', userSchema);

    User.remove({
    username : userName,
    email : userEmail
    }
    , function(err, removed){
        console.log(removed);
		res.redirect("userlist");
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

/* GET Edit User page. */
router.get('/edit', function(req, res) {
    res.render('edit', { title: 'Edit User' });
});

/* GET Delete User page. */
router.get('/delete', function(req, res) {
    res.render('delete', { title: 'Delete User' });
});


module.exports = router;

