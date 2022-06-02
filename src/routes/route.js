const express = require('express');
const externalModule = require('./../logger/logger')
const externalModule2=require('./../util/helper')
const externalModule3=require('./../validator/formatter')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('The constant in logger route has a value '+externalModule.welcome1)
    console.log('the helper route has date info'+externalModule2.date)
    console.log('the helper route has month info'+externalModule2.month)
    console.log('the helper route has other'+externalModule2.info)
    console.log('the helper route has other'+externalModule3.trim1)
    console.log('the helper route has other'+externalModule3.lowerCase)
    console.log('the helper route has other'+externalModule3.upperCase)
    externalModule.welcome1()
    externalModule2.date()
    externalModule2.month()
    externalModule2.info()
    externalModule3.trim1()
    externalModule3.lowerCase()
    externalModule3.upperCase()

    res.send('My first ever api!')
});

router.get('/test-me1', function (req, res) {
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