// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//-----------------------------------------------------------------------------

/*   this for testing api output  
   https://mulberry-giant.glitch.me/api/timestamp/2015-12-25
   ---------------------------------------------------------
   -   valid date_string = {"unix": date_string.getTime(), "utc" : date_string.toUTCString()}
   - invalid date_string = {"error" : "Invalid Date" }
   -   empty date_string = new Date();
*/

var timestampUrl = '/api/timestamp/:date_string?';
app.get(timestampUrl, (req, res) => {
  var date_string = req.params.date_string;

  (date_string === undefined) ? date_string = new Date() : date_string = new Date(date_string);
  var invalidDate = isNaN(Date.parse(date_string));
  
  var validObj = {"unix": date_string.getTime(), "utc": date_string.toUTCString()};
  var invalidObj = {"error": "Invalid Date"};
  
  (invalidDate) ? res.send(invalidObj) : res.send(validObj);
});

//----------------------------------------------------------------------------


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});