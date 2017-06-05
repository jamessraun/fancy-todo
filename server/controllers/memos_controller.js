var mongoose = require('mongoose')
 ,  Memo = require('../models/memo')
 ,  bcrypt = require('bcrypt')
 ,  jwt = require('jsonwebtoken')

mongoose.connect('mongodb://localhost/todo')

 var createMemo = (req,res)=>{
   console.log(req.body);
   let new_memo = {
                title:req.body.title,
                text:req.body.text,
                is_complete: false,
                created_at: new Date(),
                updated_at: new Date(),
                user_id : req.params.id
              }

   Memo.create(new_memo)
   .then(memo =>{
     res.send(memo)
   })
   .catch(err =>{
     res.send(error)
   })

 }

 var getAllMemoByUser = (req,res)=>{

   if(req.params.id){
     Memo.find({user_id:req.params.id}).populate('user_id').exec((err,memos)=>{
       if(err) res.send(err)
       else res.send(memos)
     })
   }else res.send('Not authorized')
 }

 var updateMemo = (req,res)=>{

     Memo.findById(req.params.id)
     .then(memo=>{
       memo.title=req.body.title || memo.title
       memo.text=req.body.text || memo.text

       memo.save((err,updateMemo) =>{
         if(err) res.send(err)
         else res.send(updateMemo)
       })
     })

 }

 var deleteMemo = (req,res)=>{
     Memo.findById(req.params.id).
     then(memo=>{
       memo.remove((err,message) =>{
         if(err) res.send(err)
         else res.send(message)
       })
     })
 }

 var completeMemo = (req,res)=>{
     Memo.findById(req.params.id)
     .then(memo=>{
       memo.is_complete=true
       memo.save((err,updateMemo) =>{
         if(err) res.send(err)
         else res.send(updateMemo)
       })
     })
 }
 var uncompleteMemo = (req,res)=>{
     Memo.findById(req.params.id)
     .then(memo=>{
       memo.is_complete=false
       memo.save((err,updateMemo) =>{
         if(err) res.send(err)
         else res.send(updateMemo)
       })
     })
 }


module.exports = {
  createMemo:createMemo,
  getAllMemoByUser:getAllMemoByUser,
  updateMemo:updateMemo,
  deleteMemo:deleteMemo,
  completeMemo:completeMemo,
  uncompleteMemo:uncompleteMemo
};
