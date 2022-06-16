const jwt=require("jsonwebtoken");



const authentication= function(req,res,next){
    try{
    let token = req.headers["x-auth-token"];
  //  if (!token== req.headers["x-auth-token"])
    if (!token){
    return res.send({ status: false, msg: "token must be present" })
     }
    console.log()
    next()
    }
    catch (error) {
        res.status(500).send({ msg: "Error", error: err.message })
      }}

//module.exports.authentication=authentication


const auth= function(req,res,next){
        try{
        let token = req.headers["x-auth-token"];
        let decodedToken=jwt.verify(token,"functionup-radon");
        //console.log(decodedToken)
        let userToBeMOdified=req.params.userId
        let userLoggedId=decodedToken.userId
        
    
        if(userToBeMOdified!=userLoggedId) return res.send({status: false,msg:"user logged in not allowed "})
        else
       { next()}
    
        }catch(error){
        res.status(500).send(error);
        // }
    }
}

    // }catch(error){
    //     res.status(404).snd(error);
    // }



module.exports.authentication=authentication
module.exports.authorisation=auth