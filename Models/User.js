const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define('user',
{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email:{
        type: Sequelize.STRING
    },
    password:{
        type: Sequelize.STRING
    },
    rol:{
        type: Sequelize.STRING
    },
    fecha:{
        type: Sequelize.NOW
    }
},{
    timestamps: false
})