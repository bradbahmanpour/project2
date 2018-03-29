var db = require("../models");


module.exports = function(app) {
    app.get("/topSpots", function(req, res) {
        console.log("topSpots route triggered")
        db.topSpot.findAll(req.body).then(function(data){
            res.json(data);
        });
});
};