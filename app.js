const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
         res.sendFile(__dirname + "/index.html");
    })
app.post("/", function(req, res){
       
        const query = req.body.cityName
    const apiKey = "45398419f1aec197e3135b49f2d3e98a"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units=metric"
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp 
            const desc= weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const ImageURL ="http://openweathermap.org/img/wn/"+ icon+ "@2x.png"
            res.write("<p>The weather is currently "+desc +"<p>");
            res.write( "<h1>Current temperature in "+ query +  " is " + temp+" degress Celcius<h1>");
            res.write("<img src="+ ImageURL+">");
            res.send()
             })
        })

})

   


app.listen(5000, function(){
    console.log("Server is running on Port 5000!");
})
 