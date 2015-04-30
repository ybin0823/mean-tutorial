var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactList', ['contactList']);

app.use(express.static(__dirname + '/public'));

app.get('/contactList', function(req, res) {
	console.log("I received from GET a request")

	db.contactList.find(function (err, docs) {
		console.log(docs);
		res.json(docs);
	});
});

app.listen(3000, function() {
	console.log("Server started at port 3000");
});