var db = require("../models");
var request = require("request");


module.exports = function (app) {
    app.get("/topSpots/:id", function (req, res) {
        // console.log("topSpots route triggered")
        db.topSpot.findOne({
                id: req.params.id
            })
            .then(function (data) {
                // console.log(data);
                var imageArr = data.images.split(",");
                var spotObj = {
                    spot: data.spot,
                    images: imageArr,
                    body: data.body,
                    zip: data.zip
                };
                // console.log(imageArr);        
                var hbsObject = {
                    topSpots: spotObj
                };
                console.log("line 24" + hbsObject);

                var apiKey = "appid=9b645d08bdee68ac9c3cf483c0d243d5";
                var zip = data.zip;
                var weatherQuery = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",us&" + apiKey;
                var weatherObj = {};
                request(weatherQuery, function (error, response, body) {
                    if (!error && response.statusCode === 200) {

                        spotObj.desc = JSON.parse(body).weather.description;
                        spotObj.temp = JSON.parse(body).main.temp;
                        spotObj.maxTemp = JSON.parse(body).main.temp_max;
                        spotObj.minTemp = JSON.parse(body).main.temp_min;


                        // console.log("line 36" , JSON.parse(body));
                        // console.log(spotObj);
                        res.render("index", spotObj);
                    }
                });

            });
    });
};