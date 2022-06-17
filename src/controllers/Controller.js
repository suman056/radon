let axios = require("axios")


let getLondonTemp = async function (req, res) {
      let api=req.query.apiid
      let city=req.query.city
    try {
        let options = {
            method: 'get',
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data.main.temp
        res.status(200).send({ temperature: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getDistrictsSession = async function (req, res) {
    try {
        let id = req.query.district_id
        let date= req.query.date
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${id}&date=${date}`
        }
        let result = await axios(options);
       console.log(result.data)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let tempCitiesSort = async function (req, res) {
    try {
        let  city=["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let tempCity=[]
        for (let i in city){
            let tempcity={city:city[i]}
            var option={
                method:"get",
                url: `http://api.openweathermap.org/data/2.5/weather?q=${city[i]}&appid=a9e717f91305db5702d827b090964c89`
            }
            let temp= await axios(option)
            tempcity.temperature=temp.data.main.temp
            tempCity.push(tempcity)
        }
        console.log(tempCity)
         let sortTempCity=tempCity.sort((a,b)=> a.temperature-b.temperature)
        
        res.status(200).send({ msg: tempCity })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let memeHandler = async function (req, res) {
    try {
        let memeid=req.query.memeid
        let text1=req.query.text1
        let text2=req.query.text2
        let option={
            type:"post",
            url:`https://api.imgflip.com/caption_image?template_id=${memeid}&text0=${text1}&text1=${text2}&username=chewie12345&password=meme@123`
        }
       
        let resultdata=await axios(option)
        
        res.send({link:resultdata.data})
        
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


module.exports.getLondonTemp=getLondonTemp
module.exports.getDistricts = getDistrictsSession
module.exports.tempCityafterSorting=tempCitiesSort
module.exports.memeHandler=memeHandler