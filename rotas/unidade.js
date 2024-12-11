const express = require('express');
const controladorUnidade = require('../controlador/unidade.js');
const router = express.Router();

router.route("/")
  //rota: GET /Unidade/
  .get(controladorUnidade.listarTodos)
  //rota: POST /Unidade/
  .post(controladorUnidade.cadastrar);

router.route("/:id")
  //rota: GET /Unidade/:id (ex: /Unidade/1)
  .get(controladorUnidade.listarApenasUm)
  //rota: DELETE /Unidade/:id (ex: /Unidade/1)
  .delete(controladorUnidade.remover)
  //rota: PUT /Unidade/:id (ex: /Unidade/1)
  .put(controladorUnidade.alterar);

router.param('id', controladorUnidade.carregar);

module.exports = router;