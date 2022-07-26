const {isValidRequestBody, isValidData, isValidObjectId}=require("../validator/validator")
const userModel=require("../model/userModel")
const aws=require("../validator/aws")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

function Checkphone(number){
    if (/^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(number)) {
        return true
    }
    return false
 }


const registerUser = async function (req, res) {
    try {

        const requestBody = req.body
      

        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'value in request body is required' })
            return
        }

        //extract param
        let { fname, lname, email, password, phone, address,profileImage } = requestBody
        let missdata=""

    if (!isValidData(fname)) {
        missdata = missdata + " fname"
    }
    if (!isValidData(lname)) {
        missdata = missdata + " lname"

    }
    if (!isValidData(email)) {
        missdata = missdata + " email"

    }
    
    if (!isValidData(phone)) {
        missdata = missdata + " phone"

    }
    if (!isValidData(password)) {
        missdata = missdata + " password"

    }
    if (!isValidData(address)) {
        missdata = missdata + " address"

    }
    if (!isValidData(address.shipping)) {
        missdata = missdata + " shipping address"

    }
    if (!isValidData(address.shipping.street)) {
        missdata = missdata + " shipping-street"

    }
    if (!isValidData(address.shipping.city)) {
        missdata = missdata + " shipping-city"
    }
    if (!isValidData(address.shipping.pincode)) {
        missdata = missdata + " shipping-pincode"

    }
    if (!isValidData(address.billing)) {
        missdata = missdata + " billing address"

    }
    if (!isValidData(address.billing.street)) {
        missdata = missdata + " billing-street"

    }
    if (!isValidData(address.billing.city)) {
        missdata = missdata + " billing-city"

    }
    if (!isValidData(address.billing.pincode)) {
        missdata = missdata + " billing-pincode"

    }
    if(missdata){
        let msg=missdata+" is missing"
        return res.status(400).send({status:false,message:msg})
    }
        if (!isValidData(fname)) {
            return res.status(400).send({ status: false, message: 'first name is not valid' })

        }

        if (!isValidData(lname)) {
            return res.status(400).send({ status: false, message: 'last name is not valid' })

        }

        if (!isValidData(email)) {
            res.status(400).send({ status: false, message: 'email is required' })
            return
        }

        if (!isValidData(password)) {
            res.status(400).send({ status: false, message: 'password is required' })
            return
        }

        if (!((password.length > 7) && (password.length < 16))) {

            return res.status(400).send({ status: false, message: `Password length should be between 8 and 15.` })

        }
        if (!Checkphone(phone.trim())) {
            return res.status(400).send({ status: false, msg: "The phone no. is not valid" })
        }
        if (!isValidData(address)) {
            return res.status(400).send({ status: false, msg: "Address is mandatory" })
        }
        if (!isValidData(address.shipping)) {
            return res.status(400).send({ status: false, msg: "Shipping address is missing mandatory fields" })

        }
        if (!isValidData(address.shipping.street && address.shipping.city && address.shipping.pincode)) {
            return res.status(400).send({ status: false, msg: "Some shipping address details or detail are/is missing" })
        }
        if (!isValidData(address.billing)) {
            return res.status(400).send({ status: false, msg: "Billing address is missing mandatory fields" })
        }
        if (!isValidData(address.billing.street && address.billing.city && address.billing.pincode)) {
            return res.status(400).send({ status: false, msg: "Some billing address details or detail are/is missing" })
        }
        const isNumberorEmailAlreadyUsed = await userModel.findOne({ phone }, { email });
        if (isNumberorEmailAlreadyUsed) {
          res.status(400).send({ status: false, message: `${phone} number or ${email} mail is already registered` })
            return 
        }
        if (!isValidData(email)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide valid email' })
            return 
        }

        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email.trim()))) {
            res.status(400).send({ status: false, message: `Email should be a valid email address` })
            return
        }
        let files = req.files;
        if (files && files.length > 0) {
            //upload to s3 and return true..incase of error in uploading this will goto catch block( as rejected promise)
            let uploadedFileURL = await aws.uploadFile(files[0]); // expect this function to take file as input and give url of uploaded file as output 
            //    res.status(201).send({ status: true, data: uploadedFileURL });
            const EncrypPassword = await bcrypt.hash(password, 10)
            // console.log(EncrypPassword)
            profileImage = uploadedFileURL
            const userData = { fname, lname, email, phone, profileImage, password: EncrypPassword, address }
            let saveduser = await userModel.create(userData)
            res.status(201).send({ status: true, message: 'user created succesfully', data: saveduser })
        }
        else {
            res.status(400).send({ status: false, msg: "No file to write" });
        }


    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })

    }
}
const login = async function(req,res){
    try{
        let data = req.body


    
        
        if(Object.keys(data).length == 0)
        res.status(400).send({ status:false, msg: "There are no any Data in Request Body Please Enter some Valid data"})
        let {email, password} =data
    
        if(!(isValidData(email) && isValidData(password)))
        res.status(400).send({status:false, msg:"email and password both required" })
    
        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))){
            return res.status(400).send({status:false, msg:"Email Should be valid EmailId"})
        }
    
        if(password.length < 8 || password.length > 16){
            return res.status(400).send({ status: false, msg: "Password Shiuld be Min 8 and Max 16"})
        }
    
        let user = await userModel.findOne({email:email})
        console.log(user)
        if (user){
            let passwordmatch = bcrypt.compareSync(data.password, user.password)
            if (passwordmatch){
                
                let token = jwt.sign({ userId: user._id}, "RoomNo-74",{expiresIn:'365d'})
                let details = {userid: user._id, token: token}
    
                return res.status(200).send({status:true, msg: "Login Sucessfully", data:details})
            }
            else {
                return res.status(404).send({status:false, msg: "Password is Not match"})
            }
        }
        return res.status(404).send({status: false, msg: "email not found"})
    
    }
    catch(error){
        res.status(500).send({ msg: "server error", err:error.message })
    }
    }

const getUserDetails=async function(req,res){
    try
    {
    let dToken=req.decodedtoken 
    let userId=req.params.userId.trim()
    
    if(!userId){
        return res.status(400).send({status:false,message:"userId is missing in the path parameter"})
    }
    if(!isValidObjectId(userId)){
        return res.status(400).send({status:false,message:"not a valid userId"})
    }
    if(dToken.userId!=userId){
        return res.status(401).send({staus:false,message:"you are not autheticated"})
    }
    const userDetails= await userModel.findById({_id:userId})
     
    res.status(200).send({status:true,message:"User profile details",data:userDetails})
}
catch(err){
    res.status(500).send({ status: false, error: err.message })
}
}

// const updateUser= async function(req,res){
//     let userId=req.params.userId
//     if(!isValidRequestBody(req.body)){
//         return res.status(400).send({status:false,message:"nothing to update,please provide input"})
//     }
//     let {fname,lname,email,profileImage,phone,password,address}=req.body
//     let filter={}
//     if(fname){
//         if(!isValidData(fname)){
//             return res.status(400).send({status:false,message:"please provide proper firstname"})
//         }
//         filter.fname=fname
//     }
//     if(lname){
//         if(!isValidData(lname)){
//             return res.status(400).send({status:false,message:"please provide proper lastname"})
//         }
//         filter.lname=lname
//      }
//      if(email){
//         if(!isValidData(email)||!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email)){
//             return res.status(400).send({status:false,message:"please provide proper email"})
//         }
//         let uniqueemail= await userModel.findOne(email)
//         if(uniqueemail){
//             return res.status(400).send({status:false,message:"email is already used"})
//         }
//         filter.email=email
//      }
//      if(phone){
//         if(!isValidData(phone)||!/^[6-9]{1}\d{9}$/.test(phone)){
//             return res.status(400).send({status:false,message:"not a valid phone no"})
//         }
//         filter.phone=phone
//      }
//      if(address){
//         if(Object.keys(address)==0){
//             return res.status(400).send({status:false,message:"address should be "})
//         }
//      }
// }



























module.exports={getUserDetails,registerUser,login}
