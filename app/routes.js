module.exports = app => {
    const livros = require("./controllers/livros.controller.js");

    var router = require("express").Router();

    // Cadastrar um livro
    router.post("/livros/", livros.create);

    // exibir um registro por id
    router.get("/livros/:id", livros.findOne);

    // exibir todos os registros
    router.get("/livros/", livros.findAll);

    // Atualizar um registro or id
    router.put("/livros/:id", livros.update);

    // Recuperar todas as notícias publicadas
    router.get("/livros", livros.findAllPublished);

    // Excluir um registro por id
    router.delete("/livros/:id", livros.delete);

    // Excluir todos os registros
    router.delete("/livros", livros.deleteAll);

    app.use('/api/', router);
}
