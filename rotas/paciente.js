const express = require('express');
const controladorPaciente = require('../controlador/paciente.js');

const router = express.Router();

router.route("/")
  //rota: GET /Paciente/
  .get(controladorPaciente.listarTodos)
  //rota: POST /Paciente/
  .post(controladorPaciente.cadastrar);

router.route("/:id")
  //rota: GET /Paciente/:id (ex: /Paciente/1)
  .get(controladorPaciente.listarApenasUm)
  //rota: DELETE /Paciente/:id (ex: /Paciente/1)
  .delete(controladorPaciente.remover)
  //rota: PUT /Paciente/:id (ex: /Paciente/1)
  .put(controladorPaciente.alterar);

router.param('id', controladorPaciente.carregar);

module.exports = router;