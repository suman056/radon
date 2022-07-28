// const productModel=require("../model/productModel")
// const userModel= require("../model/productModel")
// const { isValidRequestBody, isValidData, isValidObjectId ,isValidAlpha} = require("./validator")

// const cartValidationCart= async function(req,res,next){
//     let userId= req.params.userId.trim()
//     if(!userId){
//         return res.status(400).send({status:false,message:"user id is not present the path parameters"})
//     }
//     if(!isValidObjectId(userId)){
//         return res.status(400).send({status:false,message:`${userId} is not a valid object id`})
//     }
    
//     if(req.body.cartId){
//        let items=req.body.items
//        let itemcount=0
//        for(let i=0;i<items.length;i++){
//         if(!isValidObjectId(items[i].productId)){
//             return res.status(400).send({status:false,message:"not a valid objectId"})
//         }
//         if(typeof items[i].quantity!=Number||items[i].quantity<1){
//             return res.status(400).send({status:false,message:`quantity for productId ${items[i].productId}is not valid`})
//         }
//         itemcount=itemcount+items[i].quantity
//        }
//        let totalPrice=0
//        for(let j=0;j<items.length;j++){
//         let priceProduct= await productModel.findOne({_id:items[i].productId,isDeleted:false}).select(price)
//         if(!priceProduct){
//             return res.status(400).send({status:false,message:"this product is not available"}) 
//         }
//         totalPrice=totalPrice+priceProduct
//        }

//     }
    
// }