const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  operation:   { type: String ,required: true },
  result: { type: Number , required : true}
});

module.exports = mongoose.model('History', HistorySchema);
