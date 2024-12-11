const { Agente, Unidade } = require('../modelos/');
function listarTodos(req, res, next) {
  //retorna todos os Pacientes cadastrados
  Agente.findAll().then(function (listaAgentes) {
    res.json(listaAgentes);
  });
}
function listarTodosporUnidade(req, res, next) {
  if(req.unidade){
    Agente.findAll({
      where: {
        unidadeId: req.unidade.id
      }
    }).then(function (listaVacinacaos) {
      res.json(listaVacinacaos);
    }).catch((err) => {
      res.status(401).json({ error: 'lista não foi encontrada' });
    })
  } else {
    res.status(404).json({
      message: "unidade informada não foi encontrado"
    })
  }
}

function cadastrar(req, res, next) {
  if (req.unidade) {
    Agente.create({
      nome: req.body.nome,
      cpf: req.body.cpf,
      contato: req.body.contato,
      email: req.body.email,
      senha: req.body.senha,
      unidadeId: req.unidade.id,
    }).then((agente) => {
      //se essa função for executada, o Agente foi cadastrado
      //envia para quem pediu o cadastro os dados do Agente cadastrado
      //isso inclui o ID que é autoincremento
      res.json(agente);
    }).catch((err) => {
      res.status(401).json({ error: 'Não foi possível criar o agente' });
    })
  } else {
    res.status(401).json({ error: 'Não foi possível criar o agente, informe uma unidade valida' });
  }
}

function listarApenasUm(req, res, next) {
  //verifica se o paciente foi encontrado pela função de carregar (executada anteriormente)
  if (req.agente) {
    //envia o paciente que está armazenado na requisição
    res.json(req.agente);
  } else {
    //caso não seja encontrada, enviará um erro 404 (NotFound) e uma mensagem
    res.status(404).json({
      message: 'O agente informado não existe'
    })
  }
}

function alterar(req, res, next) {
  const { unidade, agente } = req;
  if (agente && unidade) {
    Agente.findOne({
      where: {
        id: agente.id,
        unidadeId: unidade.id
      }
    }).then((agente) => {
      if (agente.nome != req.body.nome && req.body.nome != null) {
        agente.nome = req.body.nome;
      }
      if (agente.cpf != req.body.cpf && req.body.cpf != null) {
        agente.cpf = req.body.cpf;
      }
      if (agente.contato != req.body.contato && req.body.contato != null) {
        agente.descricao = req.body.contato;
      }
      if (agente.email != req.body.email && req.body.email != null) {
        agente.email = req.body.email;
      }
      if (agente.senha != req.body.senha && req.body.senha != null) {
        agente.senha = req.body.senha;
      }
      if (agente.unidadeId != req.body.unidadeId && req.body.unidade_Id != null) {
        agente.unidadeId = req.body.unidadeId;
      }
      agente.save().then((dados) => {
        res.json(dados);
      }).catch((err) => {
        res.status(401).json({ error: 'Agente ou unidade inexistente' });
      })
    })
  } else {
    res.status(401).json({ error: 'Agente ou unidade inexistente' })
  }
}

function remover(req, res, next) {
  if (req.agente) {
    req.agente.destroy()
    res.json({
      message: 'agente foi eliminado'
    })
  } else {
    res.json({
      message: 'agente invalido'
    })
  }
}

/**
 * 
 * @param {*} id id será preenchido com o número que estiver na rota
 */
function carregar(req, res, next, id) {
  Agente.findOne({
    where: {
      id: id
    }
  })
    //na linha abaixo é utilizado Arrow Functions no lugar da função "anônima" (function (paciente) { ... })
    //para saber mais sobre Arrow function acesse:
    //https://raphaelfabeni.com/es6-arrow-functions/
    .then((agente) => {
      //armena o paciente na requisição, para que a próxima função
      //consiga recuperá-lo
      req.agente = agente;
      next();
    })

}

/**
 * 
 * @param {*} unidade_id id será preenchido com o número que estiver na rota
 */
function carregarUnidade(req, res, next, unidade_id) {
  Unidade.findOne({
    where: {
      id: unidade_id
    }
  })
    //na linha abaixo é utilizado Arrow Functions no lugar da função "anônima" (function (unidade) { ... })
    //para saber mais sobre Arrow function acesse:
    //https://raphaelfabeni.com/es6-arrow-functions/
    .then((unidade) => {
      //armena o agente na requisição, para que a próxima função
      //consiga recuperá-lo
      req.unidade = unidade;
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
  carregarUnidade,
  listarTodosporUnidade
}