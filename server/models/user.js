var mongoose = require('mongoose')
 ,  Schema = mongoose.Schema;

 var match_email = [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'ivalid email!']
 
 var userSchema = new Schema({
   name: String,
   username: {type:String,require:true,unique:true},
   password: {type:String,require:true},
   email: {type:String,require:true,unique:true,match:match_email}
 });

 var User = mongoose.model('User',userSchema);

 module.exports = User;
