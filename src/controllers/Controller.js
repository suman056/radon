const { set } = require("mongoose")
const AuthorModel= require("../models/authorModel")

const BookModel= require("../models/bookModel")

const number=require("../routes/route")

const createAuthor= async function (req, res) {
    let data= req.body
    let savedData= await AuthorModel.create(data)
    res.send({msg: savedData})
}


const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})}
// const getUsersData= async function (req, res) {
//     let allUsers= await UserModel.find()
//     res.send({msg: allUsers})
// }
const bookByChetanBhagat= async function (req, res) {
    let iD= await AuthorModel.find({ author_name:"Chetan Bhagat"}).select({author_id:1,_id:0})
     
      let bookdata= await BookModel.find(iD[0]).select({name:1,_id:0})
    
    res.send({msg:bookdata})}



const updateBookPrice= async function (req,res) {
    let book=await BookModel.findOneAndUpdate({name:"Two states"},{$set:{price:100}},{new:true}).select({author_id:1,_id:0})
    
     let authorData= await AuthorModel.find(book).select({author_name:1,_id:0})
      let price=await BookModel.find({name:"Two states"}).select({price:1,_id:0})
    res.send({msg:authorData,price})
}



const findBookByCost= async function (req, res) {
    let book1= await BookModel.find({price:{$gte:50,$lte:100}}).select({author_id:1,_id:0})
    let x=book1.map(a=>a.author_id)
    let uniq = [...new Set(x)];
    let authorname=await AuthorModel.find({author_id:uniq.map(x=>x)}).select({author_name:1,_id:0})
    res.send({msg:authorname})
}  




    

module.exports.createAuthor= createAuthor
// module.exports.getUsersData= getUsersData
module.exports.createBook= createBook

module.exports.bookByChetanBhagat=bookByChetanBhagat

module.exports.updateBookPrice=updateBookPrice


module.exports.findBookByCost=findBookByCost
