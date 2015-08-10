var express = require('express');
var app = express();

app.engine('html', require('ejs').renderFile);


app.get('/', function(req, res){
  res.render('menu.html');
});

app.get('/post', function(req, res){
  res.render('postcheck.html');
});

app.get('/check', function (req, res) {
  res.send('<h2>GET request detected.</p><p><a href="/">Back</a></h2>');
});

app.post('/check', function (req, res) {
  res.send('<h2>POST request detected.</p><p><a href="/">Back</a></h2>');
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

