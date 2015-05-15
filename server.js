var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/contactList');

var contactListSchema = mongoose.Schema({
	name: String,
	email: String,
	number: String
}, { collection: 'contactList' });

var ContactList = mongoose.model('contactList', contactListSchema);

app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/bower_components'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(bodyParser.json());

app.get('/contactList', function (req, res) {
	console.log("I received from GET a request")
	ContactList.find(function (err, docs) {
		console.log(docs);
		res.json(docs);
	});
});

app.post('/contactList', function (req, res) {
	console.log("I received from POST a request : ", req.body);

	// 새 인스턴스를 생성해서 저장하는 방법(save)
	// var newContactList = new ContactList({
	// 	name: req.body.name,
	// 	email: req.body.email,
	// 	number: req.body.number
	// });

	// newContactList.save(function (err, doc) {
	// 	res.json(doc);
	// });
	ContactList.create(req.body, function (err, doc) {
		res.json(doc);
	});
});

app.delete('/contactList/:id', function (req, res) {
	console.log("I received from DELETE a request : ", req.params.id);
	ContactList.findByIdAndRemove(req.params.id, function (err, doc) {
		console.log(doc);
		res.json(doc);
	});
});

app.put('/contactList/:id', function (req, res) {
	console.log("I received from PUT a request : ", req.params.id);
	ContactList.findByIdAndUpdate(req.params.id, { 
		name: req.body.name, 
		email: req.body.email,
		number: req.body.number
	}, { new: true }, function (err, doc) { 
		console.log(doc);
		res.json(doc);
	});
});

app.listen(3000, function() {
	console.log("Server started at port 3000");
});