var mongoose = require('mongoose')
var Schema = mongoose.Schema;

module.exports = mongoose.model("Article",new Schema({
  name:String
})