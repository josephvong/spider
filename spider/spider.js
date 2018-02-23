const fs = require('fs');
let superagent = require('superagent') // 引入 superagent库
const setting= require('./config/utils') 

const baseParm = setting.spiderParams.baseParm // 默认  
const reqUrl = 'https://so.m.jd.com/ware/searchList.action'// 爬取的 api
 

function fetch_data(url,queryParams){
  return new Promise((resolve,reject)=>{
    superagent.post(url)
    .type('form')
    .send(queryParams)
    .end((err,sres)=>{ 
      err?reject(err):resolve(sres.text) 
    })
  })
}

// 获取
function totalMount(){
  return new Promise((resolve,reject)=>{
    return fetch_data(reqUrl,baseParm).then((res)=>{
      let data = JSON.parse(res)
      let value = JSON.parse(data.value)
      let wlist = value.wareList 
      resolve(wlist.wareCount)  //
    }).catch((err)=>{
      reject(err)
    })
  })
}

function listSpider(page){
  let params = {page:page,...baseParm}   
  return fetch_data(reqUrl,params)  
} 

function dataFilter(res){
  let data = JSON.parse(res)
  let value = JSON.parse(data.value)
  let wlist = value.wareList.wareList

  return wlist
}



async function recurSpider(){
  let total = await totalMount()
  return new Promise((result,reject)=>{
    let index = 1
    let num = 0
    let list = []
    function getData(){
      if(index >= 20){
      //if(num >= total/10){  
        result(list)
        return 
      }
      setTimeout(()=>{
        listSpider(index).then((res)=>{
          index += 1  // 翻页
          let tmp = dataFilter(res)
          num += tmp.length
          let secKill = tmp.filter((item)=>{
            return item.secKill == true
          })
          list = list.concat(secKill) 
          console.log('ok:' + num)
          getData()
        })
      },300)
    }
    getData()
  }) 
}


exports.totalMount = totalMount 
 
exports.recurSpider = recurSpider 