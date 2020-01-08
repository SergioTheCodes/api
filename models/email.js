const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define('arguments',
{
    emails:{
        type: Sequelize.TEXT
    }
},{
    timestamps: false
})