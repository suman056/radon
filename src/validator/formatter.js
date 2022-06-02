const a='HelloSuman'
function trim(){
    console.log('the hardcoded string '+a)
}
function changetoLowerCase(){
    const d=a.toLowerCase()
    console.log('the lowrcase '+d)
}
function changeToUpperCase(){
    const e=a.toUpperCase()
    console.log('the uppercase '+e)
}
module.exports.trim1=trim
module.exports.lowerCase=changetoLowerCase
module.exports.upperCase=changeToUpperCase