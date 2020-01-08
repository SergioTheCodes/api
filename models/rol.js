const Sequelize = require("sequelize")
const db = require("../database/db.js")

module.exports = db.sequelize.define('rols',
{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rol:{
        type: Sequelize.STRING
    },
    state:{
        type: Sequelize.BOOLEAN
    }
}
)
