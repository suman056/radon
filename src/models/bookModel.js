const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    bookName: String,
    author: {
        type: ObjectId,
        ref: "NewAuthor"
    },
    price:Number,
    ratings:Number,
    publisher:{
         type:ObjectId,
         ref:"PublisherName"
    }

}, { timestamps: true });


module.exports = mongoose.model('NewBook', bookSchema)
