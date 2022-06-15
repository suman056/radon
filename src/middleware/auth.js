let userModel=require("../models/userModel")
let jwt= require("jsonwebtoken")

const auth=  function(req,res,next){
    let token = req.headers["x-Auth-token"];
    
    if (!token){ token = req.headers["x-auth-token"];
           
    }
    if (!token) return res.send({ status: false, msg: "token must be present" });
          
  jwt.verify(token, "functionup-radon",function(a,b){
       
        if (a){
     res.send({ status: false, msg: "authentication falied" });
     throw "exit"}
    let userId =req.params.userId
   
    if(b.userId!==userId){  res.send({status:false,msg:"authorization error"});throw "exit";}
       
      
    
        }
    
    );
    // console.log(decodedToken.userId)
  
    
    
    next()
}




module.exports.auth=auth