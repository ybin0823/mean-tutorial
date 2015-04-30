var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/contactList', function(req, res) {
	console.log("I received from GET a request")

	person1 = {
		name : 'Tim', 
		email : 'tim@gmail.com',
		number : '(111) 111-1111'
	};

	person2 = {
		name : 'Emily', 
		email : 'emily@gmail.com',
		number : '(222) 222-2222'
	};

	person3 = {
		name : 'John', 
		email : 'john@gmail.com',
		number : '(333) 333-3333'
	};

	var contactList = [person1, person2, person3];
	res.json(contactList);
});

app.listen(3000, function() {
	console.log("Server started at port 3000");
});