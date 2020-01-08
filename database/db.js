const Sequelize = require ("sequelize")
const db = {}
const sequelize = new Sequelize("harcorp_tugo", "harcorp_tugo" , "Tugo2019@" ,{
    host: 'localhost',
    dialect: 'mysql',
    operationAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db;
