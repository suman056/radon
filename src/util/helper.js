function printDate(){
    console.log("2nd")
}
function printMonth(){
    console.log("june")
}
function getBatchInfo(){
    console.log("Roadon, W3D2, the topic for today is Nodejs module system")
}
module.exports.date=printDate
module.exports.month=printMonth
module.exports.info=getBatchInfo