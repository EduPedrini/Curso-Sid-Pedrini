const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require('body-parser');
const { Router } = require("express");
const port = 3000;
let total = 0;

//conexão ao banco de dados
const Sequelize = require('sequelize');
const sequelize = new Sequelize('teste','root','admin', {
    host: "localhost",
    dialect: 'mysql'
})

sequelize.authenticate().then(function(){
    console.log("Conectado com sucesso!!")
}).catch(function(erro){
    console.log("Falha ao se conectar: "+erro)
});

//postagem

const Postagem = sequelize.define('usuarios', {
  nome: {
      type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
},
  idade: {
  type: Sequelize.INTEGER
},
  sexo: {
  type: Sequelize.STRING
},
  cidade: {
  type: Sequelize.STRING
}
});

//REALIZA O INSERT (cria a tabela no banco)
//Postagem.sync({force: true});

//Chama index
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });
//rota chama tela de usuarios
app.get('/usuarios', function(req, res) { 
    res.sendFile(path.join(__dirname, '/usuarios.html'));
  });

//função para aumentar o total
app.get('/aumentaTotal', (req, res) => {
    total++;
  res.send(`Hello World! ${total}`);
});

// simula erro em tela
app.get('/error', (req, res) => {
    try {
        throw new Error("MEU ERRO FORÇADO");
    } catch (error) {
        res.status(500).send("DEU ERRO");
    } 
});

//bodyparser para receber dados do formulario.

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

// rota post do formulario
app.post('/add', function(req, res){
    Postagem.create({
      nome: (req.body.nome),
      email: (req.body.email),
      idade: (req.body.idade),
      sexo: (req.body.sexo),
      cidade: (req.body.cidade)
    });
    res.send("CADASTRO REALIZADO COM SUCESSO!!!");
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
