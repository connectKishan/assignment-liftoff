var express = require('express');
var app = express();
var port = 4040;
var fs = require('fs');
var userRouter = express.Router();
var ejs = require("ejs");
var multer = require('multer');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var bodyparser = require('body-parser');
var path = require("path")
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'voris'
});

connection.connect();  

app.set('view engine', 'views');
app.use('/api',userRouter); 
app.use(express.static("../VORIS/style"))
app.use(express.static("../VORIS/app"))
app.use(express.static("../VORIS/node_modules"))
app.use(express.static("../VORIS/node_modules"))
app.use(express.static("../VORIS/"))
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
  var user={ 
  f_name : req.body.first_name,
   mid_name : req.body.middle_name,
  l_name:req.body.last_name,
   comp_name:req.body.comp_name,
   email:req.body.email}

  connection.query('INSERT INTO users SET ?', user, function (err, result)  { 
    if (err) {
console.log("error ocurred",err);
res.send({
 "code":400,
 "failed":"error ocurred"
})
}else{

res.send({
 "code":200,
 "success":"user registered sucessfully"
   });
}

});
});

var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
      cb(null, '/uploads/')
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
  }
});
var upload = multer({ //multer settings
              storage: storage
          }).single('file');
/** API path that will upload the files */
app.post('/upload', function(req, res) {
  upload(req,res,function(err){
      if(err){
           res.json({error_code:1,err_desc:err});
           return;
      }
       res.json({error_code:0,err_desc:null});
  })
});


app.get('/delete',function(req,res){
  console.log(req.body)
  var email=req.body.email;
  console.log(email)
  connection.query('delete from users where email=?',email,function(err,result){
    if (err) {
      console.log("error ocurred",err);
      res.send({
       "code":400,
       "failed":"error ocurred"
      })
      }else{
        res.send({
          "code":200,
          "success":"user registered sucessfully"
            });
      }
      
  });
})

app.get('/formList', function(req, res) {

  connection.query('Select * from users',  function (err, result)  { 
    if (err) {
console.log("error ocurred",err);
res.send({
 "code":400,
 "failed":"error ocurred"
})
}else{
res.send(result);
}

});
});

app.listen(port, function() {
  console.log('server up and running at port: %s', port);
});