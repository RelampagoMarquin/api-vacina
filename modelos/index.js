const Paciente = require("./paciente.js");
const Agente = require("./agente.js");
const Unidade = require("./unidade.js");
const Vacina = require("./vacina.js");
const Vacinacao = require("./vacinacao.js");

const modelos = {
  Paciente,
  Agente,
  Unidade,
  Vacina,
  Vacinacao
};

Object.entries(modelos).forEach(([name, model]) => {
  model.sync();
  //model.associate(modelos);
  console.log(name);
})

module.exports = {
  Paciente,
  Agente,
  Unidade,
  Vacina,
  Vacinacao
}