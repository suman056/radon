const { count } = require("console")
const res = require("express/lib/response")
const BookModel= require("../models/bookModel")
/*
Assignment :
Create a books collection in your DB ( using bookModel with following fields)- bookName( mandatory
field), price containing Indian and european price, year ( should be 2021 if no year is provided) , tags
array, authorName, totalPages , stockAvailable ( true false)
create the following API’s (write logic in bookController and routes in routes):
● createBook : to create a new entry..use this api to create 11+ entries in your collection
● bookList : gives all the books- their bookName and authorName only
● getBooksInYear: takes year as input in post request and gives list of all books published that
year
● getXINRBooks- request to return all books who have an Indian price tag of “100INR” or “200INR”
or “500INR”
● getRandomBooks - returns books that are available in stock or have more than 500 pages
*/
const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}
const bookList= async function (req, res) {
    let savedData1= await BookModel.find().select({bookName:1,authorName:1,_id:0})
     res.send({msg:savedData1})
   
}
const getBookInYear= async function (req, res) {
    let yearValue=req.body
    let savedData1= await BookModel.find(yearValue)
     res.send({msg:savedData1})
    
   
}
const getXINRBooks= async function (req, res) {
    
    let savedData1= await BookModel.find({'price.Indian':{$in:[500,350,235]}})
     res.send({msg:savedData1})
   
}
      
const getRandomBooks= async function (req, res) {
    
    let savedData1= await BookModel.find({$or:[{stockAvailable:true},{totalPage:{$gt:300}}]})
     res.send({msg:savedData1})
   
}




module.exports.createBook= createBook
module.exports.bookList= bookList
module.exports.getBookInYear=getBookInYear
module.exports.getXINRBooks=getXINRBooks
module.exports.getRandomBooks=getRandomBooks
