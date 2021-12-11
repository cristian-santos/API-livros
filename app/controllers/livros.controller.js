const { livros } = require("../models");
const db = require("../models");
const Livros = db.livros;
const {Op} = require("sequelize");


// inserir paciente
exports.create = (req, res) => {
    if((!req.body.nome) || (!req.body.autor)) {
        res.status(400).send({
            message: "O livro não pode ser registrado sem nome ou nome do autor."
        });
        return;
    }
    const livros = {
        nome: req.body.nome,
        autor: req.body.autor,
        editora: req.body.editora,
        qtd_paginas: req.body.qtd_paginas,
        cod_isbn: req.body.cod_isbn,
        data_publicacao: req.body.data_publicacao
    }
    Livros.create(livros).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Ocorreu um erro ao registrar o livro. Erro interno no servidor."
        });
    });
}


// Exibir um livro
exports.findOne = (req, res) => {
    const id = req.params.id;
    Livros.findByPk(id)
    .then(data => {
        if(data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Não foi possível localizar o livro do id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Erro ao exibir o livro de id=${id}. Erro interno no servidor.`
        });
    });
}


// Exibir todos os livros
exports.findAll = (req, res) => {
    const nome = req.query.nome;
    var condicao = nome ? {nome: { [Op.like]: `%${nome}%`} } : null;

    Livros.findAll({where: condicao})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Não foi possível exibir os livros. Erro interno no servidor."
        });
    });
}


// Atualizar os dados de um livro
exports.update = (req, res) => {
    const id = req.params.id;
    Livros.update(req.body,{
        where: {id: id}
    })
    .then(num => {
        if(num == 1) {
            res.send({
                message: "Dados do livro atualizado com sucesso."
            });
        } else {
            res.send({
                message: `Não foi possível atualizar os dados do livro de id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Erro ao atualizar os dados do livro de id=${id}. Erro interno no servidor.`
        });
    });
}


// Exibir todos os livros publicados
exports.findAllPublished = (req, res) => {
    Livros.findAll({
        where: {livros: true}
    })
    .then(
        data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocoreu um erro exibir os livros. Erro interno no servidor."
            });
        });
    };


// Excluir um livro
exports.delete = (req, res) => {
    const id = req.params.id;
    Livros.destroy({
        where: {id: id}
    })
    .then(num => {
        if(num == 1) {
            res.send({
                message: "Livro excluído com sucesso."
            });
        } else {
            res.send({
                message: `Erro ao deletar o livro de id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Erro ao deletar o livro de id=${id}. Erro interno no servidor.`
        })
    });
}


// Excluir todos os livros
exports.deleteAll = (req, res) => {
    Livros.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({
            message: "Todos os livros foram excluidos com sucesso."
        });
    })
    .catch(err => {
        res.status(500).send({
            message: "Não foi possível excluir todos os livros. Erro interno do servidor."
        });
    });
}
