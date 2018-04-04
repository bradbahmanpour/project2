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
                console.log(imageArr);
                var spotObj = {
                    spot: data.spot,
                    images: imageArr,
                    body: data.body,
                    zip: data.zip
                };
                        
                var hbsObject = {
                    topSpots: spotObj
                };
                // console.log("line 24" + hbsObject);

                var apiKey = "appid=9b645d08bdee68ac9c3cf483c0d243d5";
                var zip = data.zip;
                var weatherQuery = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",us&" + apiKey;
                request(weatherQuery, function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        console.log(JSON.parse(body));
                        spotObj.desc = JSON.parse(body).weather[0].main;
                        
                       var degrees = parseInt(JSON.parse(body).main.temp);
                       degrees= ((degrees * 9) / 5 )- 459.67;
                       degrees = degrees.toFixed(0);
                       spotObj.temp = degrees;

                       var degrees1 = parseInt(JSON.parse(body).main.temp_min);
                       degrees1= ((degrees1 * 9) / 5 )- 459.67;
                       degrees1 = degrees1.toFixed(0);
                       spotObj.temp_min = degrees1;

                       var degrees2 = parseInt(JSON.parse(body).main.temp_max);
                       degrees2= ((degrees2 * 9) / 5 )- 459.67;
                       degrees2 = degrees2.toFixed(0);
                       spotObj.temp_max = degrees2;

                        res.render("index", spotObj);
                    }
                });
                // var weatherQuery1 = "http://api.wunderground.com/api/Your_Key/tide/geolookup/q/"+zip+".json"
                // request()

            });
    });

app.get('/classes/:id', function (req, res) {
    // console.log(“topSpots route triggered”)
    db.classes.findOne({ 
        where: {
            id: req.params.id 
        }  
        })
        .then(function (data) {
            console.log(data);
            var classObj = {
                name: data.className,
                desc: data.classDescription,
                schedule: data.classSchedule,
                prereq: data.classPrerequisit,
                price: data.classPrice
            }
            res.render('classes', classObj);
            });                 
        });
    };
