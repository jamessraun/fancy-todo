var mongoose = require('mongoose')
 ,  User = require('../models/user')
 ,  bcrypt = require('bcrypt')
 ,  jwt = require('jsonwebtoken')

mongoose.connect('mongodb://localhost/todo')

var signup = (req,res)=>{

  let saltRounds = 10

  bcrypt.hash(req.body.password,saltRounds,(err,password)=>{
    let new_user ={
               name:req.body.name,
               username:req.body.username,
               password:password,
               email:req.body.email
             }

      User.create(new_user)
      .then(user =>{
        res.send(user)
      })
      .catch(err =>{
        res.send(err)
      })
    })
}


var login = (req,res)=>{

  User.findOne({username:req.body.username})
  .then(user =>{

    bcrypt.compare(req.body.password,user.password)
    .then(result =>{

        if(result){
          let token=jwt.sign({id:user.id,name:user.name,username:user.username,email:user.email},'secretpacekodingsecret')
          res.send(token)
        }else {
          res.send('Wrong password!')
        }
    })
    .catch(err =>{
      res.send(err)
    })
  })
  .catch(err =>{
    res.send(err)
  })
}

var loginFacebook = (req, res)=>{
  console.log('masuk login');
		User.findOne({
      email : req.body.email
    })
    .then((query)=>{
      if(query){
				var token = jwt.sign({
					id : query._id,
					name : query.name,
					email : query.email
				}, 'secretpacekodingsecret', {expiresIn : '1h'})
        console.log(token);
				res.send({
					token : token
				})
      }else{
      	User.create({
      		name : req.body.name,
      		email : req.body.email,
      		role : 'user'
      	})
      	.then((result)=>{
      		var token = jwt.sign({
						id : result._id,
						name : result.name,
						email : result.email,
					}, 'secretpacekodingsecret', {expiresIn : '1h'})
					res.send({
						token : token
					})
      	})
      }
    })
  }

module.exports ={
  signup:signup,
  login:login,
  loginFacebook:loginFacebook
};
