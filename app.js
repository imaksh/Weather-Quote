// "https://api.quotable.io/random"
const express = require("express");
const bodyParser=require("body-parser");
const app = express();
const https = require("https");
app.use(bodyParser.urlencoded({
extended:true}));

app.get("/",function(req,res){
     res.sendFile(__dirname+"/index.html");
    app.use(express.static('public'));
});
app.post("/",function(req,res){
   const city = req.body.cityName;
    const url1="https://api.quotable.io/random";
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=5e1812b10f82466b9790b006538b51c5&units=metric";
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const iconn = weatherData.weather[0].icon;
            var imgURL= "https://openweathermap.org/img/wn/"+iconn+"@2x.png";
            res.write("<h1>Its "+temp+ " Degree Celcius</h1>")
            res.write("<h4>Currently Its "+weatherDescription+"</h4>")
            res.write("<img src="+imgURL+">")
            
        });
    });
    https.get(url1,function(response){
        response.on("data",function(data){
            const quoteData=JSON.parse(data);
            const author = quoteData.author;
            const quote = quoteData.content;
            res.write("<h1>"+quote+"</h1>");
            res.write("<h4>-"+author+"</h4>");
            res.send();
        }); 
    });
  
});
    
app.listen(process.env.PORT || 3000,function(){
    console.log("its on");
});
