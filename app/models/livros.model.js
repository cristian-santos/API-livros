const { livros } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Livros = sequelize.define("livros",{
        nome: {
            type: Sequelize.STRING
        },
        autor: {
            type: Sequelize.STRING
        },
        editora: {
            type: Sequelize.STRING
        },
        qtd_paginas: {
            type: Sequelize.INTEGER
        },
        cod_isbn: {
            type: Sequelize.STRING
        },
        data_publicacao: {
            type: Sequelize.DATE
        }
    });
    return Livros;
}
