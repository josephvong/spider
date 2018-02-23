var express = require('express') 
var router = express.Router();

var WineItem = require('../models/wineItem')

router.post('/getall',(req,res)=>{ 
  WineItem.find({},(err,items)=>{
    res.json({ data:items,length:items.length })
  })
})

router.post('/select',(req,res)=>{ 
  let tmp = {...req.body}

  delete req.body.$gte
  delete req.body.$lte

  let query = Object.assign(req.body , {jdPrice:{$gte:tmp.$gte||0,$lte:tmp.$lte||1000}})

  WineItem.find({...query},(err,items)=>{
    res.json({ data:items,length:items.length })
  })
})

router.post('/getwine',(req,res)=>{
  let page = parseInt(req.body.page) || 1
  let mount = parseInt(req.body.mount) || 5
  let offset = (page-1)*mount-1 // 开始0
  let offset_end = offset + mount
  //res.json()
  WineItem.find({
    _index:{$gte:offset+1, $lte:offset_end}
  },(err,items)=>{
    res.json({ data:items,length:items.length })
  })
})
 


module.exports = router

/*
{
  "_id": "5a8f77947fd51a28fc431e29",
  "good": "98%",
  "imageurl": "http://m.360buyimg.com/mobilecms/s357x357_jfs/t4333/200/3610507204/124164/ac6d4671/58e6080eN5fffd421.jpg!q50.jpg",
  "jdDelivery": false,
  "jdPrice": "76.90",
  "lowestBuy": "0",
  "secKill": true,
  "self": true,
  "wareId": "302813",
  "wname": "法国进口红酒 拉菲（LAFITE）传奇波尔多干红葡萄酒 750ml（ASC）",
  "__v": 0
}
*/