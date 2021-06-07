require('dotenv').config()
require('./db/index')
const express=require('express')
const bodyParser=require('body-parser')
const app=express()

const port=process.env.PORT

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


var initCouch = require('./db/init_couch');
initCouch(function(err) {  
  if (err) {
    throw err
  }
  else {
    console.log('couchdb initialized');
  }
});

const userRoute=require('./routes/index')
app.use(userRoute)

app.listen(port,()=>{
    console.log('server is up and running on port:',port)
})




//https://codepen.io/astol/pen/qbbOXE        => pouchdb on front-end
//https://medium.com/yld-blog/node-js-databases-using-couchdb-5135f6f45dc1       => couchdb on server side.
//***************************************************************************************************** */

//https://www.youtube.com/watch?v=R6LUMXrAoCE  =>youtube