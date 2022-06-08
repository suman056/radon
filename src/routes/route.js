const express = require('express');
const router = express.Router();
const bookModel=require("../models/bookModel")
// const UserModel= require("../models/userModel.js")
// const Controller= require("../controllers/Controller")
const Controller= require("../controllers/Controller");
const authorModel=require("../models/authorModel")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", Controller.createAuthor )



router.post("/createBook", Controller.createBook)


router.get("/bookByChetanBhagat", Controller.bookByChetanBhagat)



router.post("/updateBookPrice", Controller.updateBookPrice)



router.get("/findBookByCost", Controller.findBookByCost)


router.get("/books/:indexnumber", async function(req,res){   
    let x=parseInt(req.params.indexnumber)
    let bookname= await bookModel.find({author_id:x}).select({name:1,_id:0})
    res.send({bookname})

})

router.get("/conditionSatisfied", async function(req,res){
    let authorID= await bookModel.find({rating:{$gt:4}}).select({author_id:1,_id:0})
     let authorIDnew=  authorID.map(x=>x.author_id)
     let uniqueAuthorId=[...new Set(authorIDnew)]
    let authorname= await authorModel.find({age:{$gt:50}}).find({author_id:uniqueAuthorId.map(x=>x)}).select({author_name:1,_id:0,age:1})
    res.send({authorname})
})







// //MOMENT JS
// const moment = require('moment');
// router.get("/dateManipulations", function (req, res) {
    
//     // const today = moment();
//     // let x= today.add(10, "days")

//     // let validOrNot= moment("29-02-1991", "DD-MM-YYYY").isValid()
//     // console.log(validOrNot)
    
//     const dateA = moment('01-01-1900', 'DD-MM-YYYY');
//     const dateB = moment('01-01-2000', 'DD-MM-YYYY');

//     let x= dateB.diff(dateA, "days")
//     console.log(x)

//     res.send({ msg: "all good"})
// })

module.exports = router;