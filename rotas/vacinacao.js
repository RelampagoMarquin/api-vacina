const express = require('express');
const controladorVacinacao = require('../controlador/vacinacao.js');

const router = express.Router();

router.route("/")
  //rota: GET /vacinacao/
  .get(controladorVacinacao.listarTodos)
  //rota: POST /vacinacao/
  .post(controladorVacinacao.cadastrar);

router.route("/:id")
  //rota: GET /vacinacao/:id (ex: /vacvacinacaoina/1)
  .get(controladorVacinacao.listarApenasUm)
  //rota: DELETE /vacinacao/:id (ex: /vacvacinacaoina/1)
  .delete(controladorVacinacao.remover)
  //rota: PUT /vacinacao/:id (ex: /vacivacinacaona/1)
  .put(controladorVacinacao.alterar);

router.route('/paciente/:pacienteid')
  //rota: GET /vacinacao/:id (ex: /vacinacao/paciente/1)
  .get(controladorVacinacao.listarTodosporPaciente);

router.route('/vacina/:vacinaid')
  //rota: GET /vacinacao/:id (ex: /vacinacao/vacina/1)
  .get(controladorVacinacao.listarTodosporVacina)

router.route('/agente/:agenteid')
  //rota: GET /vacinacao/:id (ex: /vacivacinacaona/agente/1)
  .get(controladorVacinacao.listarTodosporAgente)

router.param('id', controladorVacinacao.carregar);
router.param('pacienteid', controladorVacinacao.carregarPaciente);
router.param('vacinaid', controladorVacinacao.carregarVacina);
router.param('agenteid', controladorVacinacao.carregarAgente);

module.exports = router;