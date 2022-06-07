const mongoose = require('mongoose');
const defaults = require('nodemon/lib/config/defaults');

const bookSchema = new mongoose.Schema( {
  bookName:{
          type:String,
          required:true
         },
   price:{
          Indian:Number,
          European:Number 
                 },
    year:{
          type:String,
          default:2021
         },
      tags:[String],
    authorName:String,
    totalPage:Number,
    stockAvailable:{type:Boolean,
                    defaults:false}   

}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema) 


