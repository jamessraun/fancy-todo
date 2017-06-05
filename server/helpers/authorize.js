var jwt = require('jsonwebtoken')

var authorize = (req,res,next) =>{
  let token = req.body.token

  if(token){
    jwt.verify(token,'secretpacekodingsecret',(err,decoded)=>{
      res.send(decoded)
    })
  }else res.send('you need to login')
}

module.exports = authorize;
