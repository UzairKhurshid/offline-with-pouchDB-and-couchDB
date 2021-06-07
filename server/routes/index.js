const express=require('express')
const bcrypt=require('bcryptjs')
const path=require('path')
const router=express.Router()

var users = require('../db/user');
var db       = require('nano')('http://uzair:uzair@123@localhost:5984/users')
        , per_page = 100
        , params   = {include_docs: true, limit: per_page, descending: true}
        ;

router.get('/',async(req,res)=>{
    try {
        
        return res.sendFile(path.join(__dirname,'../../client/index.html'))
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({
            msg:'error',
            error:err.message
        })
    }
})


router.get('/get_users',async(req,res)=>{
    try {
        db.list(params, function(error,doc,headers) {

            if (error) {
              // oh noes! we got an error
              console.log('User fetching Error :'+error)
            } else {
              // okay, doc contains our document
              console.log(doc)
              return res.status(200).json({
                msg:'success',
                users:doc
            })
            }
          });
        
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({
            msg:'error',
            error:err.message
        })
    }
})

router.get('/delete_user/:id',async(req,res)=>{
    try {
        let id=req.params.id
        console.log(id)
        db.remove(id);
        return res.status(200).json({
            msg:'success'
        })
        
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({
            msg:'error',
            error:err.message
        })
    }
})

router.post('/create_user',async(req,res)=>{
    try {

         var user = {  
            username:req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password
          };
          users.create(user, function(err,us) {  
            if (err) {
                console.log('user insertion error')
                throw err;
            }
            else {
                console.log('user inserted');
                return res.status(200).json({
                    msg:'success',
                    user:us
                })
            }
          });
          

        
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({
            msg:'error',
            error:err.message
        })
    }
})


//you cannot update a couchdb document instead you can reinsert the document with change in revision.more detail in link given below
//https://writings.nunojob.com/2012/07/How-To-Update-A-Document-With-Nano-The-CouchDB-Client-for-Node.js.html
router.post('/update_user',async(req,res)=>{
    try {
        
        db.insert({"foo": "bar"}, "foobar", function (err, foo) {
            if(err) {
                return res.status(400).json({
                    msg:'Failed',
                })
            }
            db.insert({foo: "bar", "_rev": foo.rev}, "foobar", 
            function (error, response) {
              if(!error) {
                console.log("it worked");
                return res.status(200).json({
                    msg:'success',
                })
              } else {
                console.log("sad panda");
                return res.status(200).json({
                    msg:'success',
                })
              }
            });
          });
          

        
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({
            msg:'error',
            error:err.message
        })
    }
})




module.exports=router