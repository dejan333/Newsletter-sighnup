
const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");



const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req,res){
 res.sendFile(__dirname + '/index.html');
})

app.post('/',function(req,res){
  
const query =  req.body.cityName;
const unit = "metric";
const apiKey = "3fe9b3a2b31a0d12bdf2405ee468e4ad";

const url = 'https://api.openweathermap.org/data/2.5/weather?appid=' + apiKey + '&q=' + query + '&units='+ unit +'';
console.log(url);
https.get(url, function(response){
  console.log(response.statusCode);

  response.on('data', function(data){
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    const weatherIcon = weatherData.weather[0].icon;
    const iconUrl = 'https://openweathermap.org/img/wn/'+ weatherIcon +'@2x.png';
    
    console.log(iconUrl);

    res.write('<h1>The temperature in '+ query +' is ' + temp + ' Celcius </h1>' );
    res.write('<p>The weather is currently <strong>' + description + '</strong>  </p>' );
    res.write('<img src="' + iconUrl + '">' );
    res.send();
  })
})

})

app.listen(3000, console.log('App is listen on port:3000'))