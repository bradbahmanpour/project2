var db = require("../models");


module.exports = function(app) {

    app.get("/api/top_spots", function(req, res) {
        var query = {};
        if (req.query.id) {
          query.id = req.query.id;
        }

        db.Top-spots.findAll({
          where: query,
          include: [db.id, db.spot, db.images, db.body]
        }).then(function(dbID) {
          res.json(dbID);
        });
      });

};