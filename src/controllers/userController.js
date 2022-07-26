const login = async function(req,res){
try{
    let data = req.body
    let {email, password} = data

    if(Object.keys(data).length == 0)
    res.status(400).send({ status:false, msg: "There are no any Data in Request Body Please Enter some Valid data"})

    if(!(Validator.isValid(email) && validator.isValid(password)))
    res.status(400).send({status:false, msg:"email and password both required" })

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
        return res.status(400).send({status:false, msg:"Email Should be valid EmailId"})
    }

    if(password.length < 8 || password.length > 16){
        return res.status(400).send({ status: false, msg: "Password Shiuld be Min 8 and Max 16"})
    }

    let user = await userModel.findOne({email:email})
    if (user){
        let passwordmatch = bcrypt.compareSync(data.password, user.password)
        if (passwordmatch){
            Math.floor(Date.now()/ 1000)
            let token = jwt.sign({ userid: user._id, exp: iat + (60*50)}, "RoomNo-74")
            let details = {userid: user._id, token: token}

            return res.status(200).send({status:true, msg: "Login Sucessfully", data:details})
        }
        else {
            return res.status(404).send({status:false, msg: "Password is Not match"})
        }
    }
    return res.status(404).send({status: false, msg: "email not found"})

}
catch(error){
    res.status(500).send({ msg: "server error", err: error })
}
}