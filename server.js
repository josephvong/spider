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


var superagent = require('superagent') // 引入 superagent库
var cheerio = require('cheerio') // html节点操作库


app.get('/', function (req, res) {
  //res.send('Hello World!');
  superagent.get('https://search.jd.com/Search')
    .set({Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'})
    .query({
      keyword:'威士忌',
      enc:'utf-8',
      wq:'威士忌',
      pvid:'bed31552e7c24ce48f5c847d2172179a'
    })
    .end((err,sres)=>{ 
      var arr = [];
      var $ = cheerio.load(sres.text);
      $('#J_goodsList ul.gl-warp>li .p-name a').each((index,item)=>{
        var $elem = $(item)
        arr.push({
          title: $elem.attr('title')
        })
      }) 

      res.send(arr)
    })
});
  

app.listen(3000);
