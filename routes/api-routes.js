var db = require("../models");
var request = require("request");

// Routes
// =============================================================
module.exports = function (app) {

    // GET route for getting all of the Classes Information
    app.get("/api/classes/", function (req, res) {
        db.classes.findAll({})
            .then(function (dbPost) {
                res.json(dbPost);
            });
    });


    // Get route for retrieving a single Class
    app.get("/api/classes/:id", function (req, res) {
        db.classes.findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(function (dbPost) {
                res.json(dbPost);
            });
    });

    // POST route for saving a new Class
    app.post("/api/classes", function (req, res) {
        console.log(req.body);
        db.classes.create({
            className: req.body.className,
            classDescription: req.body.classDescription,
            classPrice: req.body.classPrice
            })
            .then(function (dbPost) {
                res.json(dbPost);
            });
    });

    // DELETE route for deleting Classes
    app.delete("/api/classes/:id", function (req, res) {
        db.classes.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(function (dbPost) {
                res.json(dbPost);
            });
    });

    // PUT route for updating Classes
    app.put("/api/classes", function (req, res) {
        db.classes.update(req.body, {
                where: {
                    id: req.body.id
                }
            })
            .then(function (dbPost) {
                res.json(dbPost);
            });
    });

    app.get("/topSpots/:id", function (req, res) {
        // console.log("topSpots route triggered")
        db.topSpot.findOne({ 
            where: {
                id: req.params.id 
            }  
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
                // console.log("line 24" + hbsObject);

                var apiKey = "appid=9b645d08bdee68ac9c3cf483c0d243d5";
                var zip = data.zip;
                var weatherQuery = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",us&" + apiKey;
                request(weatherQuery, function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        // console.log(JSON.parse(body));
                        spotObj.desc = JSON.parse(body).weather[0].main;
                        spotObj.temp = JSON.parse(body).main.temp;
                        spotObj.maxTemp = JSON.parse(body).main.temp_max;
                        spotObj.minTemp = JSON.parse(body).main.temp_min;

                        res.render("index", spotObj);
                    }
                });
                // var weatherQuery1 = "http://api.wunderground.com/api/Your_Key/tide/geolookup/q/"+zip+".json"
                // request()

            });
    });
};