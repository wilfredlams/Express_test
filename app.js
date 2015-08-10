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

var server = app.listen(5000, function () {
var host = server.address().address;
var port = server.address().port;

console.log('App listening at http://%s:%s', host, port);
});

