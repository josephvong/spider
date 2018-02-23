var mongoose = require('mongoose')
var Schema = mongoose.Schema;

module.exports = mongoose.model("wineItem",new Schema({
  good: String,
  imageurl: String,
  jdDelivery: Boolean,
  jdPrice: Number, 
  lowestBuy: String, 
  secKill: Boolean,
  self: Boolean,  
  wareId: String,
  wname: String,
  _index:Number
}))

/*{ 
  good: "98%",
  imageurl: "http://m.360buyimg.com/mobilecms/s357x357_jfs/t3226/244/1527006044/158729/80570ddc/57cebb81Na9dcc29b.jpg!q50.jpg",
  jdDelivery: false,
  jdPrice: "398.00", 
  lowestBuy: "0", 
  secKill: true,
  self: true,  
  wareId: "3564062",
  wname: "长城（GreatWall）红酒 特选5年橡木桶解百纳干红葡萄酒 整箱装 750ml*6瓶"
}*/