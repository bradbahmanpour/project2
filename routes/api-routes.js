var db = require("../models");

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

};