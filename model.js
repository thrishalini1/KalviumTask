const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  question:   { type: String , required : true },
  answer  :   { type: Number , required : true }
});

module.exports = mongoose.model('History', HistorySchema);
