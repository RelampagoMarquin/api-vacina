const express = require('express');
const controladorAgente = require('../controlador/agente.js');

const router = express.Router();

router.route("/")
  .get(controladorAgente.listarTodos)

router.route("/:unidade_id")
  //rota: GET /agente/
  .get(controladorAgente.listarTodosporUnidade)
  //rota: POST /agente/
  .post(controladorAgente.cadastrar);

router.route("/acao/:id")
  //rota: GET /agente/:id (ex: /agente/acao/1)
  .get(controladorAgente.listarApenasUm)
  //rota: DELETE /agente/:id (ex: /agente/acao/1)
  .delete(controladorAgente.remover)

router.route("/:unidade_id/:id")
  //rota: PUT /Agente/:id (ex: /Agente/1/1)
  .put(controladorAgente.alterar);


router.param('id', controladorAgente.carregar);
router.param('unidade_id', controladorAgente.carregarUnidade);

module.exports = router;