var express = require('express');
var app = express();
var port = 4040;
var fs = require('fs');
var userRouter = express.Router();
var ejs = require("ejs");
var bodyparser = require('body-parser');
var path = require("path")

app.set('view engine', 'views');
app.use('/api',userRouter); 
app.use(express.static("../VORIS/style"))
app.use(express.static("../VORIS/app"))
app.use(express.static("../VORIS/node_modules"))
app.use(express.static("../VORIS/node_modules"))
app.use(express.static("../VORIS/Data"))
console.log("dirname", __dirname);
app.use(bodyparser.urlencoded({
    extended : true
}))
app.use(bodyparser.json())

app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res) { 
    res.sendFile(path.join (__dirname + "/views/index.html"));
});

app.post('/formData', function(req, res) {
  var name = req.query.name;
  var age = req.query.age;

  var person = {
    name: name,
    age: age
  };

  savePersonToPublicFolder(person, function(err) {
    if (err) {
      res.status(404).send('User not saved');
      return;
    }

    res.send('User saved');
  });
});

function savePersonToPublicFolder(person, callback) {
  fs.writeFile('/fileList.json', JSON.stringify(person), callback);
}

app.listen(port, function() {
  console.log('server up and running at port: %s', port);
});