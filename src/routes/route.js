const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const commonMw=require("../middleware/middleware")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

// //The userId is sent by front end
router.get("/users/:userId",commonMw.authentication,commonMw.authorisation, userController.getUserData)

router.put("/users/:userId",commonMw.authentication,commonMw.authorisation,userController.updateUser )

router.delete("/users/:userId",commonMw.authentication,commonMw.authorisation, userController.isDeleted)


module.exports = router;