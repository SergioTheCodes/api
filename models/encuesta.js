const User = require("./User")
const Sequelize = require("sequelize")
const db = require("../database/db.js")

module.exports = db.sequelize.define('encuestas',
{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: Sequelize.STRING
    },
    pregunta: {
        type: Sequelize.STRING
    }
},
{
    timestamps: false
}
)
