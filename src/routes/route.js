const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")

const BookController= require("../controllers/bookController")





router.post("/createBook", BookController.createBook  )

router.get("/bookList", BookController.bookList)

router.post("/getBookInYear", BookController.getBookInYear  )

router.get("/getXINRBooks", BookController.getXINRBooks  )

router.get("/getRandomBooks", BookController.getRandomBooks  )



module.exports = router;