const express = require('express');
const router = express.Router();
const Name=require('./../playersname/playername')

router.get('/students/:name', function(req, res) {
    let studentName = req.params.name
    console.log(studentName)
    res.send(studentName)
})

router.get("/random" , function(req, res) {
    res.send("hi there")
})


router.get("/test-api" , function(req, res) {
    res.send("hi FunctionUp")
})


router.get("/test-api-2" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API")
})


router.get("/test-api-3" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's ")
})


router.get("/test-api-4" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
})



router.get("/test-api-5" , function(req, res) {
    res.send("hi FunctionUp5. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
})

router.get("/test-api-6" , function(req, res) {
    res.send({a:56, b: 45})
})

router.post("/test-post", function(req, res) {
    res.send([ 23, 45 , 6])
})


router.post("/test-post-2", function(req, res) {
    res.send(  { msg: "hi" , status: true }  )
})

router.post("/player", function(req, res) {
      
    let nameFromBody=req.body
      for (let x=0;x<Name.playerName.length;x++)
      {
        if(nameFromBody.name===Name.playerName[x].name&&nameFromBody.dob===Name.playerName[x].dob&&nameFromBody.gender===Name.playerName[x].gender&&nameFromBody.city===Name.playerName[x].city&&nameFromBody.sports[0]===Name.playerName[x].sports[0]){
            res.send(  { data:nameFromBody.name, status:true  })
            break;
            }
           
      }
      
        res.send(  { data: nameFromBody.name, status:false })
        
     
    })



router.post("/test-post-4", function(req, res) {
    let arr= [ 12, "functionup"]
    let ele= req.body.element
    arr.push(ele)
    res.send(  { msg: arr , status: true }  )
})

module.exports = router;