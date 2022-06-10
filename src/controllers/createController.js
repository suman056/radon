const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel= require("../models/publisherModel")

const createAuthor= async function(req,res){
     let author=req.body
     let authorCreated= await authorModel.create(author)
     res.send({authordetails:authorCreated})
}

const createPublishers= async function(req,res){
    let publisher=req.body
    let publisherCreated= await publisherModel.create(publisher)
    res.send({publisherDetails:publisherCreated})
}


const createBook= async function (req, res) {
       let bookdetail=req.body
       let authordetail=  req.body.author
       let publisherDetails=req.body.publisher
       let authoridfinder= await authorModel.findOne({_id:authordetail})
       let publisherfinder= await publisherModel.findOne({_id:publisherDetails})
       if( authordetail === undefined||  publisherDetails === undefined )  
       {res.send({msg:"details required"})}
       else if(authoridfinder == null || publisherfinder == null)
       {res.send({msg:"invalid input"})}
       else
    {let bookCreated= await bookModel.create(bookdetail)
    res.send({bookdetails:bookCreated})}
}

 module.exports.createAuthor=createAuthor

 module.exports.cretaePublishers=createPublishers

 module.exports.createBook=createBook