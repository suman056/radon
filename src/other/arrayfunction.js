let _ = require("lodash");
let arrOfMonth = ['January','February','March','April','May','June','July','August','September','October','November','December']
let size=3
 let x=[]
 
 for (let t=0;t<20;t++){
    t=t+1
    x.push(t)
 }
 
let z=[1,2,3]
let t=[2,5,6]
let j=[7,5,9]
let h=[8,9,15]
let i=[15,3,11]


let y=[ ["horror","The Shining"], ["drama","Titanic"],["thriller","Shutter Island"],["fantasy","Pans Labyrinth"]]
 
let a=_.chunk(arrOfMonth,size)

module.exports.tailNumber=_.tail(x)
module.exports.monthDivide=a
module.exports.mergerArray1=_.union(z,t,j,h,i)
module.exports.creatObject=_.fromPairs(y)
