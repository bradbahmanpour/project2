var db = require("../models");


module.exports = function (app) {
    app.get("/topSpots/:id", function (req, res) {
        console.log("topSpots route triggered")
        db.topSpot.findOne({
            id: req.params.id
        }).then(function (data) {
            console.log(data);
            var imageArr = data.images.split(",");
            var spotObj = {
                spot: data.spot,
                images: imageArr,
                body: data.body
            };
            console.log(imageArr);
            var hbsObject = {
                topSpots: spotObj
            };
            res.render("index", spotObj);
        });
    });

    // Adding Classes Page
    app.get("/admin", function (req, res) {
            console.log("Admin route triggered");
            res.render("classes");
    });
};