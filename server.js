var express = require('express')
var app = express();

var bodyParser = require('body-parser');
var morgan = require('morgan')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev')); 

var dburl = 'mongodb://127.0.0.1:27017/spiderDB'
var mongoose = require('mongoose')
mongoose.connect(dburl)

var db = mongoose.connection;
db.once('open', function () {
  console.log('link db success')
});


var spider = require('./spider/spider')

var superagent = require('superagent') // 引入 superagent库
//var cheerio = require('cheerio') // html节点操作库



app.get('/', function (Req, Res) {
  spider.recurSpider().then((res)=>{
    Res.send(res)
  }) 
  
  /*spider.promoSellSpider().then((res)=>{ 
    let data = JSON.parse(res)
    let value = JSON.parse(data.value)
    let list = value.wareList.wareList
    let names = list.map((item)=>{
      return item.wname
    })
    Res.send(list)
  }).catch((err)=>{
    Res.send('err')
  })*/
   
   
  
});
  

app.listen(3000);

