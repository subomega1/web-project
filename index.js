//imports
var express = require('express');

//instanciate express
var app = express();

//configure routes
app.get('/', function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Hello World</h1>');
});

//start server
app.listen(3000, function(){
    console.log('Server is running on http://localhost:3000');
});