// const {isValidRequestBody, isValidData, isValidObjectId}= require("./validator")





// const userValidation= async function(req,res,next){
//     let requestBody=req.body
//     let profileimg=req.files
//     if(!isValidRequestBody(requestBody)){
//         return res.status(400).send({status:false,message:"please give inputs"})
//     }
//     let {fname,lname,email,phone,password,address}=requestBody
//      // mandatory validation
//     let missdata=""
//     if (!isValidData(fname)) {
//         missdata = missdata + " fname"

//     }
//     if (!isValidData(lname)) {
//         missdata = missdata + " lname"

//     }
//     if (!isValidData(email)) {
//         missdata = missdata + " email"

//     }
//     if(!isValidData(profileImage)){
//         missdata = missdata + " profileImage"
//     }
//     if (!isValidData(phone)) {
//         missdata = missdata + " phone"

//     }
//     if (!isValidData(password)) {
//         missdata = missdata + " password"

//     }
//     if (!isValidData(address)) {
//         missdata = missdata + " address"

//     }
//     if (!isValidData(address.shipping)) {
//         missdata = missdata + " shipping address"

//     }
//     if (!isValidData(address.shipping.street)) {
//         missdata = missdata + " shipping-street"

//     }
//     if (!isValidData(address.shipping.city)) {
//         missdata = missdata + " shipping-city"

//     }
//     if (!isValidData(address.shipping.pincode)) {
//         missdata = missdata + " shipping-pincode"

//     }
//     if (!isValidData(address.billing)) {
//         missdata = missdata + " billing address"

//     }
//     if (!isValidData(address.billing.street)) {
//         missdata = missdata + " billing-street"

//     }
//     if (!isValidData(address.billing.city)) {
//         missdata = missdata + " billing-city"

//     }
//     if (!isValidData(address.billing.pincode)) {
//         missdata = missdata + " billing-pincode"

//     }
//     if(missdata){
//         let msg=missdata+" is missing"
//         return res.status(400).send({status:false,message:msg})
//     }

//     // individual validation

//     if(!isValidData(fname)){
//         return res.status(400).send({status:false,message:"firstname is not in proper format"})
//     }
//     if(!isValidData(lname)){
//         return res.status(400).send({status:false,message:"lastname is not in proper format"})
//     }
//     if(!isValidData(email)||!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email)){
//         return res.status(400).send({status:false,message:"firstname is not in proper format"})
//     }


// }