const express = require("express")

const multer = require("multer")
const mongoose = require("mongoose")
const app = express()
const route = require("./routes/routes")
const bodyParser=require("body-parser")

app.use(multer().any())
app.use(bodyParser.json())


mongoose.connect("mongodb+srv://suman:Mdhang%40123@atlascluster.tlenk.mongodb.net/group74Database"
    , { useNewUrlParser: true })
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use("/", route)



app.listen(process.env.PORT || 3000, function () { console.log("Express is running on port " + (process.env.PORT || 3000)) });
