const { Vacinacao, Paciente, Vacina, Agente } = require('../modelos/');

function listarTodos(req, res, next) {
  //retorna todos os vacinacaos cadastrados
  Vacinacao.findAll().then(function (listaVacinacaos) {
    res.json(listaVacinacaos);
  }).catch((err) => {
    res.status(401).json({ error: 'Não encontrar a lista' });
  });
}

function listarTodosporPaciente(req, res, next) {
  //retorna todos os vacinacaos cadastrados por vacina
  if(req.paciente){
    Vacinacao.findAll({
      where: {
        pacieteId: req.paciente.id
      }
    }).then(function (listaVacinacaos) {
      res.json(listaVacinacaos);
    }).catch((err) => {
      res.status(401).json({ error: 'Lista não encontrada' });
    });
  } else {
    res.status(404).json({
      message: "paciente informado não foi encontrado"
    })
  }
}

function listarTodosporVacina(req, res, next) {
  //retorna todos os vacinacaos cadastrados por vacina
  if(req.vacina){
    Vacinacao.findAll({
      where: {
        vacinaId: req.vacina.id
      }
    }).then(function (listaVacinacaos) {
      res.json(listaVacinacaos);
    }).catch((err) => {
      res.status(401).json({ error: 'Lista não encontrada' });
    });
  } else {
    res.status(404).json({
      message: "vacina informado não foi encontrado"
    })
  }
}

function listarTodosporAgente(req, res, next) {
  //retorna todos os vacinacaos cadastrados por agente
  if(req.agente){
    Vacinacao.findAll({
      where: {
        agenteId: req.agente.id
      }
    }).then(function (listaVacinacaos) {
      res.json(listaVacinacaos);
    }).catch((err) => {
      res.status(401).json({ error: 'Lista não encontrada' });
    });
  } else {
    res.status(404).json({
      message: "agente informado não foi encontrado"
    })
  }
}

function cadastrar(req, res, next) {
  Vacinacao.create({
    reforco: req.body.reforco,
    dataAplicacao: req.body.dataAplicacao,
    remarcada: req.body.remarcada,
    pacieteId: req.body.pacieteId,
    vacinaId: req.body.vacinaId,
    agenteId: req.body.agenteId
  }).then((vacinacao) => {
    //se essa função for executada, o vacinacao foi cadastrado
    //envia para quem pediu o cadastro os dados do vacinacao cadastrado
    //isso inclui o ID que é autoincremento
    res.json(vacinacao);
  })
}

function listarApenasUm(req, res, next) {
  //verifica se o vacinacao foi encontrado pela função de carregar (executada anteriormente)
  if (req.vacinacao) {
    //envia o vacinacao que está armazenado na requisição
    res.json(req.vacinacao);
  } else {
    //caso não seja encontrada, enviará um erro 404 (NotFound) e uma mensagem
    res.status(404).json({
      message: 'O vacinacao informado não existe'
    })
  }
}

function alterar(req, res, next) {
  if (req.vacinacao) {
    if (req.vacinacao.reforco != req.body.reforco && req.body.reforco != null) {
      req.vacinacao.reforco = req.body.reforco;
    } 
    if (req.vacinacao.dataAplicacao != req.body.dataAplicacao && req.body.dataAplicacao != null) {
      req.vacinacao.dataAplicacao = req.body.dataAplicacao;
    } 
    if (req.vacinacao.remarcada != req.body.remarcada && req.body.remarcada != null) {
      req.vacinacao.remarcada = req.body.remarcada;
    }
    if (req.vacinacao.pacieteId != req.body.pacieteId && req.body.pacieteId != null) {
      req.vacinacao.pacieteId = req.body.pacieteId;
    } 
    if (req.vacinacao.vacinaId != req.body.vacinaId && req.body.vacinaId != null) {
      req.vacinacao.vacinaId = req.body.vacinaId;
    } 
    if (req.vacinacao.agenteId != req.body.agenteId && req.body.agenteId != null) {
      req.vacinacao.agenteId = req.body.agenteId;
    }
    req.vacinacao.save()
    res.json(req.vacinacao)
  } else {
    res.json({
      message: 'vacinacao invalido'
    })
  }
}

function remover(req, res, next) {
  if (req.vacinacao) {
    req.vacinacao.destroy()
    res.json({
      message: 'vacinacao foi eliminado'
    })
  } else {
    res.json({
      message: 'vacinacao invalido'
    })
  }
}

/**
 * 
 * @param {*} id id será preenchido com o número que estiver na rota
 */
function carregar(req, res, next, id) {
  Vacinacao.findOne({
    where: {
      id: id
    }
  })
    //na linha abaixo é utilizado Arrow Functions no lugar da função "anônima" (function (vacinacao) { ... })
    //para saber mais sobre Arrow function acesse:
    //https://raphaelfabeni.com/es6-arrow-functions/
    .then((vacinacao) => {
      //armena o vacinacao na requisição, para que a próxima função
      //consiga recuperá-lo
      req.vacinacao = vacinacao;
      next();
    })

}

function carregarPaciente(req, res, next, id) {
  Paciente.findOne({
    where: {
      id: id
    }
  })
    //na linha abaixo é utilizado Arrow Functions no lugar da função "anônima" (function (vacinacao) { ... })
    //para saber mais sobre Arrow function acesse:
    //https://raphaelfabeni.com/es6-arrow-functions/
    .then((paciente) => {
      //armena o vacinacao na requisição, para que a próxima função
      //consiga recuperá-lo
      req.paciente = paciente;
      next();
    })

}

function carregarVacina(req, res, next, id) {
  Vacina.findOne({
    where: {
      id: id
    }
  })
    //na linha abaixo é utilizado Arrow Functions no lugar da função "anônima" (function (vacinacao) { ... })
    //para saber mais sobre Arrow function acesse:
    //https://raphaelfabeni.com/es6-arrow-functions/
    .then((vacina) => {
      //armena o vacinacao na requisição, para que a próxima função
      //consiga recuperá-lo
      req.vacina = vacina;
      next();
    })

}

function carregarAgente(req, res, next, id) {
  Agente.findOne({
    where: {
      id: id
    }
  })
    //na linha abaixo é utilizado Arrow Functions no lugar da função "anônima" (function (vacinacao) { ... })
    //para saber mais sobre Arrow function acesse:
    //https://raphaelfabeni.com/es6-arrow-functions/
    .then((agente) => {
      //armena o vacinacao na requisição, para que a próxima função
      //consiga recuperá-lo
      req.agente = agente;
      next();
    })

}

module.exports = {
  listarTodos,
  cadastrar,
  listarApenasUm,
  alterar,
  remover,
  carregar,
  carregarPaciente,
  carregarVacina,
  carregarAgente,
  listarTodosporPaciente,
  listarTodosporAgente,
  listarTodosporVacina
}