const setting= require('./utils')
let superagent = require('superagent') // 引入 superagent库

function fetch_data(url,queryParams){
  return new Promise((resolve,reject)=>{
    superagent.post(url)
    .set(setting.header)
    .send(queryParams)
    .end((err,sres)=>{ 
      err?reject(err):resolve(sres.text) 
    })
  })
}

exports.fetch_data = fetch_data


