var express = require('express')
var app = express();

var bodyParser = require('body-parser');
var morgan = require('morgan')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev')); 

// 数据库 连接
var dburl = 'mongodb://127.0.0.1:27017/myDB'
var mongoose = require('mongoose')
mongoose.connect(dburl)

var db = mongoose.connection;
db.once('open', function () {
  console.log('link db success')
});


//--------------爬取数据------------------ 
var spider = require('./spider')
//spider.spiderDataSave()
//spider.timeTask()

let apiRouter = require('./routes/redwine')
app.use('/api',apiRouter)

app.get('/', function (Req, Res) {
  Res.send('ok') 
});
  

app.listen(3000);

