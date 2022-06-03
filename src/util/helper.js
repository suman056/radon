const printDate=function(){
    console.log(" print 1st")
}
function printMonth(){
    console.log("print june")
}
function printBatchInfo(){
    console.log(" Roadon, W3D1, the topic for today is Nodejs module system")
}
module.exports.printDate=printDate
module.exports.month=printMonth
 module.exports.info=printBatchInfo
