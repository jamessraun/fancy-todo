var mongoose = require('mongoose')
 ,  Schema = mongoose.Schema;

 var memoSchema = new Schema({
   title: {type:String,require:true},
   text:String,
   user_id: {type:Schema.Types.ObjectId,ref:'User'},
   is_complete:Boolean,
   created_at:Date,
   updated_at:Date
 });

 var Memo = mongoose.model('Memo',memoSchema);

 module.exports = Memo;
