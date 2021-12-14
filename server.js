var express = require("express");
const cors = require("cors");
var consign = require("consign");
const { application, Router } = require("express");
const db = require("./app/models");
db.sequelize.sync({force: true}).then(() => {
    console.log("Apagando os dados e recriando o banco");
});

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set("json spaces",4);
consign().include("routes").into(app);

app.set("json spaces", 4);
consign().include("routes").into(app);

// Exibindo a documentação completa
app.get("/", function(req, res){
    res.sendFile(__dirname + "/app/view/documentacao.html");
});

// Exibindo a info do método GET
app.get("/get/info", function(req, res){
    res.sendFile(__dirname + "/app/view/get.info.html");
});

// Exibindo a info do método POST
app.get("/post/info", function(req, res){
    res.sendFile(__dirname + "/app/view/post.info.html");
});

// Exibindo a info do método PUT
app.get("/put/info", function(req, res){
    res.sendFile(__dirname + "/app/view/put.info.html");
});

// Exibindo a info do método DELETE
app.get("/delete/info", function(req, res){
    res.sendFile(__dirname + "/app/view/delete.info.html");
});

require("./app/routes")(app);

app.listen(PORT, () => console.log(`API - PORTA ${PORT}`));
