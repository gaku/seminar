var express = require('express');
var exphbs = require('express-handlebars');
var bodyparser = require('body-parser');

var app = express();

function eventWebhookError(res, statusCode, errMsg) {
  console.log("Event webhook error: %s", errMsg);
  res.writeHeader(403, {"Content-Type": "text/plain"});
  res.write(errMsg);
  res.write("\n");
  res.end();
}

function checkWebhookSignature(_url, body, signature) {
  var hmac = crypto.createHmac('sha256', evt_key)
  hmac.update(_url + body);
  var h = hmac.digest('hex');
  return signature == h
}


// setting up a template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(bodyparser.json());

var count = 0;
var ctx = {data:[]};


app.get('/', function(req, res) {
  // res.send('Hello world');

  res.render('home', ctx);
});

app.post('/evt', function(req, res) {
  console.log('Received an event');
  var event = req.body;
  console.log(event);
  ctx.data.push(event.eventData.value); 
  res.sendStatus(200);
});

app.listen(3000, function() {
  console.log('Express app listening on port 3000');
});

