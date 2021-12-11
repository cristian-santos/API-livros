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

//app.get("/", (req, res) => res.json({status:"API-executando"}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/app/view/documentacao.html");
});

app.get("/inicial", function(req, res){
    res.sendFile(__dirname + "/app/view/index.html");
});

require("./app/routes")(app);

app.listen(PORT, () => console.log(`API - PORTA ${PORT}`));
