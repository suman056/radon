const express= require("express")
const router=express.Router()
const {authetication}=require("../middleware/auth")
const{getUserDetails,registerUser,login}=require("../controllers/userController")





router.get("/user/:userId/profile",authetication,getUserDetails)
 
router.post("/register",registerUser)

router.post("/login",login)






module.exports= router