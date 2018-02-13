// 威士忌 + 销量 + 京东配送
const selfSend = {
  _format_:'json',
  //sort:1, // 销量排序
  configuredFilters:[{"bodyValues":"1","bodyKey":"self"}], // 京东配送
  keyword:'威士忌'
}
// 威士忌 + 销量 + 促销
const promoSell = {

  _format_:'json',
  page:2,
  //sort:1, // 销量排序
  configuredFilters:[{"bodyValues":"1","bodyKey":"promotion"}], // 京东配送
  keyword:'威士忌'
}

module.exports = {
  timeout: 100,     //ajax 时间间隔
  totalPage:100,    // 最大总页数
  asyncNum: 5,      //并发数目限制
  header:{          // 请求头
    'Accept':'application/json',
    'Accept-Encoding':'gzip, deflate, br',
    'Accept-Language':'zh-CN,zh;q=0.9',
    'Content-Type':'application/x-www-form-urlencoded',
    'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
    'X-Requested-With':'XMLHttpRequest'
  },
  spiderParams:{
    selfSend: selfSend,  // 威士忌 + 京东配送 (销量排序)
    promoSell: promoSell // 威士忌 + 促销 (销量排序)
  }
} 

