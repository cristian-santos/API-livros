module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "Cristian8103+Shady",
    DB: "livros",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}