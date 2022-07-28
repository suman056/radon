const cartModels = require("../model/cartModels")
const productModel = require("../model/productModel")
const userModel = require("../model/productModel")
const { isValidRequestBody, isValidData, isValidObjectId, isValidAlpha } = require("../validator/validator")

const createCart = async function (req, res) {
    try {
        let userId = req.params.userId.trim()
        if (!userId) {
            return res.status(400).send({ status: false, message: "user id is not present the path parameters" })
        }
        if (!isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: `${userId} is not a valid object id` })
        }
        let userCheck = await userModel.findById({ _id: userId })
        if (!userCheck) {
            return res.status(404).send({ status: false, message: `${userId} doesn't exist` })
        }
        let alreadyCart = await cartModels.findOne({ userId: userId })
        if (alreadyCart) {
            if (!req.body.cartId)
                return res.status(400).send({ status: false, message: "you have already created a cart ,please provide cart id" })
        }
        if (req.body.cartId) {
            let cartId = req.body.cartId
            let items = req.body.items
            let increamented = {}
            let itemcount = 0
            for (let i = 0; i < items.length; i++) {
                if (!isValidObjectId(items[i].productId)) {
                    return res.status(400).send({ status: false, message: "not a valid objectId" })
                }
                if (typeof items[i].quantity != "number" || items[i].quantity < 1) {
                    return res.status(400).send({ status: false, message: `quantity for productId ${items[i].productId}is not valid` })
                }
                itemcount = itemcount + items[i].quantity
            }
            increamented.totalItems = itemcount
            let totalPrice = 0
            for (let j = 0; j < items.length; j++) {
                let priceProduct = await productModel.findOne({ _id: items[j].productId, isDeleted: false }).select({ price: 1, _id: 0 })
                if (!priceProduct) {
                    return res.status(400).send({ status: false, message: "this product is not available" })
                }
                totalPrice = totalPrice + priceProduct.price
            }
            increamented.totalPrice = totalPrice
            let cartCheck = await cartModels.findById({ _id: cartId })
            if (!cartCheck) {
                return res.status(404).send({ status: false, message: "cart not available" })
            }
            

            let cartUpDated = await cartModels.findByIdAndUpdate({ _id: cartId }, { $push: { items: items.map(x => x) }, $inc: increamented }, { new: true })

            return res.status(200).send({ status: true, message: "Success", data: cartUpDated })

        }
        else {
            let items = req.body.items
            let filter = {}
            filter.userId = userId
            let itemcount = 0
            for (let i = 0; i < items.length; i++) {
                if (!isValidObjectId(items[i].productId)) {
                    return res.status(400).send({ status: false, message: "not a valid objectId" })
                }
                console.log(typeof items[i].quantity != "number")
                if (typeof items[i].quantity != "number" || items[i].quantity < 1) {
                    return res.status(400).send({ status: false, message: `quantity for productId ${items[i].productId}is not valid` })
                }
                itemcount = itemcount + items[i].quantity
            }
            filter.totalItems = itemcount
            let totalPrice = 0
            for (let j = 0; j < items.length; j++) {
                let priceProduct = await productModel.findOne({ _id: items[j].productId, isDeleted: false }).select({ price: 1, _id: 0 })
                if (!priceProduct) {
                    return res.status(400).send({ status: false, message: "this product is not available" })
                }
                totalPrice = totalPrice + priceProduct.price
                console.log(totalPrice)
            }
            filter.totalPrice = totalPrice

            filter.items = items
            let cartCreate = await cartModels.create(filter)

            return res.status(201).send({ status: true, message: "Success", data: cartCreate })
        }
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
        console.log(error)
    }

}


const updateProduct = async function (req, res) {
    let userId = req.params.userId.trim()
    if (!userId) {
        return res.status(400).send({ status: false, message: "user id is not present the path parameters" })
    }
    if (!isValidObjectId(userId)) {
        return res.status(400).send({ status: false, message: `${userId} is not a valid userId` })
    }
    let { cartId, productId, removeProduct } = req.body
    let missdata = ""
    if (!isValidData(cartId)) {
        missdata = missdata + " cartId"
    }
    if (!isValidData(productId)) {
        missdata = missdata + " productId"
    }
    if (!isValidData(removeProduct)) {
        missdata = missdata + " removeproduct"
    }
    if (missdata) {
        message = missdata + " is missing and required to delete product from the cart"
        return res.status(400).send({ status: false, message: message })
    }
    if (!isValidObjectId(cartId)) {
        return res.status(400).send({ status: false, message: `${cartId} is not a valid userId` })
    }
    if (!isValidObjectId(productId)) {
        return res.status(400).send({ status: false, message: `${productId} is not a valid userId` })
    }
    if (removeProduct != (0 || 1)) {
        return res.status(400).send({ status: false, message: "remove product should be 1 or 0" })
    }
    let productCheck = await productModel.findOne({ _id: productId, isDeleted: false })
    if (!productCheck) {
        return res.status(404).send({ status: false, message: `${productId} is not available` })
    }
    let userCheck = await userModel.findById({ _id: userId })
       if(!userCheck){
            if(!isValidObjectId(cartId)){
        return res.status(400).send({ status: false, message: `${cartId} is not a valid userId` })
    }
}
    let cartCheck=await cartModels.findById({_id:cartId})
    if(!cartCheck){
        return res.status(400).send({status:false,message:"cart is not available"})
    }
    let cartUpdate=await cartModels.findByIdAndUpdate({_id:cartId},{})

}
























module.exports = { createCart }