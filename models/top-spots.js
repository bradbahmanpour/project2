// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Character" model that matches up with DB
var Top_spot = sequelize.define("top-spot", {
  // the name of the character (a string)
    spot: {type: DataTypes.STRING,
        allowNull: false,
    },
    images: {type: DataTypes.STRING,
    allowNull: false,
    },
    body: {type: DataTypes.TEXT,
    allowNull: false
    }
}, {
  timestamps: false
});

// Syncs with DB
Top_spot.sync();

// Makes the Character Model available for other files (will also create a table)
module.exports = Top_spot;