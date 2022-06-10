const express = require('express');
const router = express.Router();

const allCreateController=require("../controllers/createController")
const allOperation=require("../controllers/operationController")




router.post("/createAuthor", allCreateController.createAuthor )

router.post("/createBook", allCreateController.createBook )

router.post("/createPublisher",allCreateController.cretaePublishers)

router.get("/allBookData", allOperation.allBookData)

router.put("/updatePrice", allOperation.updatePrice)

module.exports = router;