const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define('arguments',
{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pregunta:{
        type: Sequelize.STRING
    },
    idformulario:{
        type: Sequelize.INTEGER
    },
    emails:{
        type: Sequelize.TEXT
    },
    clasificacion:{
        type: Sequelize.INTEGER
    }
},{
    timestamps: false
})