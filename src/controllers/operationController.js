const bookModel=require("../models/bookModel")
const authorModel=require("../models/authorModel")
const publisherModel=require("../models/publisherModel")



const allBookDetails= async function(req,res){
    let allBookData= await bookModel.find().populate('author').populate('publisher')
    res.send({allbooks:allBookData})
}


const updatePrice= async function(req,res){
    let authorid= await authorModel.find({rating:{$gt:3.5}}).select({_id:1})
    let updatePrice=await bookModel.updateMany({author:authorid.map(x=>x._id)},{$inc:{price:10}},{new:true})
    res.send({updated:updatePrice})
}

// const isHardCover= async function(req,res){
//     let isHardCover=await  publisherModel.find({publisherName:("Penguin","HarperCollin")})
// }


module.exports.allBookData=allBookDetails
module.exports.updatePrice=updatePrice