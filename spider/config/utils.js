const baseParm = {
  _format_:'json', 
  //keyword:'威士忌'
  categoryId:9438 //葡萄酒
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
    baseParm:baseParm
  }
} 

