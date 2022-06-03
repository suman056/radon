const express = require('express');
const externalModule = require('./../logger/logger')
const externalModule1= require('./../util/helper')
const externalModule2= require('./../validator/formatter')
const router = express.Router();
const Array=require('./../other/arrayfunction')



router.get('/test-me', function (req, res) {
    
    externalModule2.trim1()
    externalModule2.lowerCase()
    externalModule2.upperCase()
    externalModule1.printDate()
   externalModule1.info()
    externalModule1.month()
    externalModule.welcome()
    res.send('my first api!')
    
});

router.get('/hello', function (req, res) {
    const a=console.log('the array of new month '+JSON.stringify(Array.monthDivide))
    const b=console.log('the tail function is '+Array.tailNumber)
    const c=console.log('the merger array is '+Array.mergerArray1)
    const d=console.log('the object is'+JSON.stringify(Array.creatObject))
    res.send('My second ever api!')
});

router.get('/test-me2', function (req, res) {
    res.send('My third api!')
});

router.get('/test-me3', function (req, res) {
    res.send('My 4th api!')
});

router.get('/test-me4', function (req, res) {
    res.send('My last api!')
});

module.exports = router;
// adding this comment for no reason