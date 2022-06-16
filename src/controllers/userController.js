const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (abcd, xyz) {
  let data = abcd.body;
  try{
  let savedData = await userModel.create(data)
  return xyz.status(201).send({msg:savedData})}
    catch (err) {
      //console.log("This is the error :", err.message)
      xyz.status(500).send({ msg: "Error", error: err.message })
  }
};
 






const loginUser = async function (req, res) {
  try {
  let userName = req.body.emailId;
  let password = req.body.password;
  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.send({
      status: false,
      msg: "username or the password is not corerct",
    });


  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "radon",
      organisation: "FunctionUp",
    },
    "functionup-radon"
  );
  res.setHeader("x-auth-token", token);
  res.status(201).send({ status: true, token: token });
}
catch (error) {
  res.status(500).send({ msg: "Error", error: err.message })
}
}








const getUserData = async function (req, res) {
  try {
  let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];

  console.log(token);
  
 
  let decodedToken = await jwt.verify(token, "functionup-radon");
  if (!decodedToken)
    return res.send({ status: false, msg: "token is invalid" });

  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });

  res.status(201).send({ status: true, data: userDetails });
  }
  catch (error) {
    res.status(500).send({ msg: "Error", error: err.message })
};
}









const updateUser = async function (req, res) {
// Do the same steps here:
// Check if the token is present
// Check if the token present is a valid token
// Return a different error message in both these cases
try {
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  //Return an error if no user with the given id exists in the db
  if (!user) {
    return res.status(404).send("No such user exists");
  }

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
  res.status(201).send({ status: updatedUser, data: updatedUser });
}catch (error) {
    res.status(500).send({ msg: "Error", error: error.message })
  }
}









const isDeleted= async function(req,res){
 
try{
let userId = req.params.userId;
let user = await userModel.findById(userId);

if (!user) {
  return res.status(404).send("No such user exists");
}

  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, {$set:{isDeleted:true}},{new:true});
  res.status(201).send({ status: updatedUser, data: updatedUser });
}catch (error) {
    res.status(500).send({ msg: "Error", error: error.message })
  } 
}  






module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.isDeleted=isDeleted