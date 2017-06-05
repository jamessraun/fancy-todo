var express = require('express')
 ,  bodyParser = require('body-parser')
 ,  index = require('./routes/index')
 ,  app = express()
 ,  cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/',index)


app.listen(3000)
