const express = require('express');
const router = express.Router();
const Controller= require("../controllers/Controller")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


// router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState", Controller.getDistricts)


router.post("/memeCreate", Controller.memeHandler  )
router.get("/weatherreport", Controller.getLondonTemp)
router.get("/tempCityAfterSorting",Controller.tempCityafterSorting)

// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date



module.exports = router;