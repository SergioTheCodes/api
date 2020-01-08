const User = require("./User")
const Sequelize = require("sequelize")
const db = require("../database/db.js")

module.exports = db.sequelize.define('answers',
{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: Sequelize.STRING
    },
    clasificacion:{
        type: Sequelize.INTEGER
    },
    argumento:{
        type: Sequelize.INTEGER
    },
    fecha:{
        type: Sequelize.DATE
    },
    respuesta:{
        type: Sequelize.INTEGER
    }
},
{
    timestamps: false
}
)
