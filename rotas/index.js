const express = require('express');
const rotasPaciente = require("./paciente.js");
const rotasUnidade = require("./unidade.js");
const rotasVacina = require("./vacina.js");
const rotasVacinacao = require("./vacinacao.js");
const rotasAgente = require("./agente.js");

const router = express.Router();

//definindo que sempre que o usuário acessar
//http://localhost:3000/
router.use("/paciente",rotasPaciente);
router.use("/agente",rotasAgente);
router.use("/unidade",rotasUnidade);
router.use("/vacina",rotasVacina);
router.use("/vacinacao",rotasVacinacao);

module.exports = router;