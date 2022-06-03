const a= 'HelloWorld'
function trim(){
    console.log("the hard coded string "+a)
}
function changeLowerCase(){
    const d=a.toLowerCase()
    console.log("the lower case function "+d)
}
function changeToUpperCase(){
    const f=a.toUpperCase()
    console.log("all are upper case "+f)
}

module.exports.trim1=trim
module.exports.lowerCase=changeLowerCase
module.exports.upperCase=changeToUpperCase
