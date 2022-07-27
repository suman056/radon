const express= require("express")
const router=express.Router()
const {authetication,authorisation}=require("../middleware/auth")
const{getUserDetails,registerUser,login,updateUser}=require("../controllers/userController")





router.get("/user/:userId/profile",authetication,getUserDetails)
 
router.post("/register",registerUser)

router.post("/login",login)

router.put("/user/:userId/profile",authetication,authorisation,updateUser)




module.exports= router