const fs = require('fs');

const setting= require('./config/utils')
const config = require('./config/index')

const baseParm = setting.spiderParams.baseParm // 默认
const promoSell = setting.spiderParams.promoSell // 促销
const selfSend = setting.spiderParams.selfSend  // 自送
// 爬取的 api
const reqUrl = 'https://so.m.jd.com/ware/searchList.action'

let promoSellList = [];
let selfSendList = [];


function listSpider(page){
  let params = {page:page,...baseParm}   
  return config.fetch_data(reqUrl,params)  
}

function promoSellSpider(){   
  return config.fetch_data(reqUrl,promoSell)  
}

function dataFilter(res){
  let data = JSON.parse(res)
  let value = JSON.parse(data.value)
  let wlist = value.wareList.wareList
  let list = wlist.filter((item)=>{
    return item.secKill == true
  })
  /*let names = list.map((item)=>{
    return item.wname
  })*/
  return list
}

function recurSpider(){
  return new Promise((result,reject)=>{
    let index = 1
    let list = []
    function getData(){
      if(index >= 10){ 
        result(list)
        return 
      }
      setTimeout(()=>{
        listSpider(index).then((res)=>{
          index += 1
          let tmp = dataFilter(res)
          list = list.concat(tmp) 
          console.log('ok:' + index)
          getData()
        })
      },2000)
    }
    getData()
  }) 
}













exports.promoSellSpider = promoSellSpider
exports.recurSpider = recurSpider
//exports.firstSpider = firstSpider