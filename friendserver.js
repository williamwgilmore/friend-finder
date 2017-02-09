var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var fs = require('fs');
var friendlist = require('./friendlist.json');

var app = express();

var PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

app.post('/survey/new', function(req, res){
	var newFriend = req.body;
	console.log(newFriend);
	compareFriend(newFriend);
	createFriend(newFriend);
	res.json(newFriend);
})

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
  app.use(express.static(__dirname + '/app'));
});

var createFriend = function(newFriend){
	
	friendlist.push(newFriend);
	fs.writeFile('friendlist.json', JSON.stringify(friendlist, null, 2), function(err){
		if (err){
			return console.log(err);
		};
	});
};

var compareFriend = function(newFriend){
	var holdItems = (JSON.stringify(friendlist, null, 2));
	holdItems = JSON.parse(holdItems);
	var friendLength = holdItems.length;
	var currentFriend = {};
	var currentDiff=100;
	var diff = 0;
	for (i=0; i<friendLength; i++){
		diff = 0;
		var currentSurvey = holdItems[i].survey;
		for (j=0; j<10; j++){
			diff += Math.abs(newFriend.survey[j]-currentSurvey[j]);
		};
		console.log(diff);
		if (diff < currentDiff){
			currentDiff = diff;
			console.log(currentFriend);
			currentFriend = holdItems[i];
			console.log(currentFriend);
		};
	};
};