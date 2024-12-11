const express = require('express');
const controladorVacina = require('../controlador/vacina.js');

const router = express.Router();

router.route("/")
  //rota: GET /vacina/
  .get(controladorVacina.listarTodos)
  //rota: POST /vacina/
  .post(controladorVacina.cadastrar);

router.route("/:id")
  //rota: GET /vacina/:id (ex: /vacina/1)
  .get(controladorVacina.listarApenasUm)
  //rota: DELETE /vacina/:id (ex: /vacina/1)
  .delete(controladorVacina.remover)
  //rota: PUT /vacina/:id (ex: /vacina/1)
  .put(controladorVacina.alterar);

router.param('id', controladorVacina.carregar);

module.exports = router;