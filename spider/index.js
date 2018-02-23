const schedule = require('node-schedule')

var spider = require('../spider/spider') // 爬虫函数
 
var WineItem = require('../models/wineItem') // 数据库table 

 

function spiderDataSave(){
  spider.recurSpider().then((res)=>{
    WineItem.remove({},()=>{
      console.log('del all')
    }) 
    res.forEach((item,index)=>{
      let wine = Object.assign(item,{jdPrice:parseFloat(item.jdPrice)})
      let wItem = new WineItem({
        ...wine,
        _index:index
      })
      wItem.save()
    })
  })
}

function timeTask(){ 
  //let rule = new schedule.RecurrenceRule(); // 创建一个时间规则
  
  //let startTime = new Date(Date.now())  
  schedule.scheduleJob({ 
    rule: '1 * * * *'
  }, function(){
    console.log('date')
    spiderDataSave()
  })  
}

exports.timeTask = timeTask
exports.spiderDataSave = spiderDataSave