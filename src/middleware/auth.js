const authentication= function(req,res,next){
    let token = req.headers["x-Auth-token"];
    if(token){next()}
    if (!token){ token = req.headers["x-auth-token"];
          if(token)
                {next()  
    }
    if (!token) return res.send({ status: false, msg: "token must be present" });
}
}



module.exports.authentication=authentication