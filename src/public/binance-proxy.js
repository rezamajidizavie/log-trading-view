var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var fs = require('fs');
var cors = require('cors');
var axios = require('axios');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/api', (req, res) => {
  axios
    .get(
      'http://index.ephoenix.ir/api/TradeViewSecurities/history?symbol=30650426998863332&resolution=D&from=1533990836&to=1565094896'
    )
    .then(response => {
      res.json(response);
    })
    .catch(err => console.log(err));
});

app.use(express.static(path.join(__dirname)));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

var port = process.env.PORT || 4000;
server.listen(port, function() {
  console.log('Listening on port '.concat(port));
});
