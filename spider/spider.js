const fs = require('fs');

const setting= require('./config/utils')
const config = require('./config/index')

const promoSell = setting.spiderParams.promoSell // 促销
const selfSend = setting.spiderParams.selfSend  // 自送
// 爬取的 api
const reqUrl = 'https://so.m.jd.com/ware/searchList.action'

let promoSellList = [];
let selfSendList = [];

//function fetch_data(url,queryParams){
function promoSellSpider(){
  /*const params = {
    page:1,
    ...promoSell
  }*/
  //console.log(params) 
  return config.fetch_data(reqUrl,promoSell) 
}

exports.promoSellSpider = promoSellSpider
