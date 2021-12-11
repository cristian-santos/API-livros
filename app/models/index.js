const dbConfig = require("../config/dbconfig");
var Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};
db.sequelize = Sequelize;
db.sequelize = sequelize;

db.livros = require("./livros.model.js")(sequelize, Sequelize);

module.exports = db;