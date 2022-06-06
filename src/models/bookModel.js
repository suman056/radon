const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookTitleName:{
        type:String,
        required:true},
    bookAuthorName:String,
    bookEdition:String,
    bookPrice:Number,
    publisherName: String,
    bookRating:{
        type:Number,
        enum:[1,2,3,4,5]
    },
    bookCategory:{
            type:String,
            enum:["Action","Thriller","Comic","Lifestyle","Travel","Siritual","Historic","Mythological"]
    },
    bookLaunchingYear:Number,
    bookFormat:{
             type:String,
             enum:["paperback","softcopy"]
    },
    readingAgeStart:Number,
    bookDimension:Number,
    printLength:Number,
    language:String,
    countryOfOrigin:String
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema) //users



// String, Number
// Boolean, Object/json, array