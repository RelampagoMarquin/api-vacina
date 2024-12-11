const { Unidade } = require('../modelos/');

function listarTodos(req, res, next) {
  //retorna todos os Unidades cadastrados
  Unidade.findAll().then(function (listaUnidades) {
    res.json(listaUnidades);
  });
}


function cadastrar(req, res, next) {
  Unidade.create({
    nome: req.body.nome,
    cnes: req.body.cnes,
    vinculo: req.body.vinculo,
    contato: req.body.contato,
    logradouro: req.body.logradouro,
    numero: req.body.numero,
    bairro: req.body.bairro,
    municipio: req.body.municipio
  }).then((unidade) => {
    //se essa função for executada, o unidade foi cadastrado
    //envia para quem pediu o cadastro os dados do unidade cadastrado
    //isso inclui o ID que é autoincremento
    res.json(unidade);
  })
}

function listarApenasUm(req, res, next) {
  //verifica se o unidade foi encontrado pela função de carregar (executada anteriormente)
  if (req.unidade) {
    //envia o unidade que está armazenado na requisição
    res.json(req.unidade);
  } else {
    //caso não seja encontrada, enviará um erro 404 (NotFound) e uma mensagem
    res.status(404).json({
      message: 'O unidade informado não existe'
    })
  }
}

function alterar(req, res, next) {
  if (req.unidade) {
    if (req.unidade.nome != req.body.nome && req.body.nome != null) {
      req.unidade.nome = req.body.nome;
    } 
    if (req.unidade.cnes != req.body.cnes && req.body.cnes != null) {
      req.unidade.cnes = req.body.cnes;
    } 
    if (req.unidade.contato != req.body.contato && req.body.contato != null) {
      req.unidade.contato = req.body.contato;
    }
    if (req.unidade.vinculo != req.body.vinculo && req.body.vinculo != null) {
      req.unidade.vinculo = req.body.vinculo;
    }
    if (req.unidade.logradouro != req.body.logradouro && req.body.logradouro != null) {
      req.unidade.logradouro = req.body.logradouro;
    } 
    if (req.unidade.numero != req.body.numero && req.body.numero != null) {
      req.unidade.numero = req.body.numero;
    } 
    if (req.unidade.bairro != req.body.bairro && req.body.bairro != null) {
      req.unidade.bairro = req.body.bairro;
    }
    if (req.unidade.municipio != req.body.municipio && req.body.municipio != null) {
      req.unidade.municipio = req.body.municipio;
    }
    req.unidade.save()
    res.json(req.unidade)
  } else {
    res.json({
      message: 'unidade invalido'
    })
  }
}

function remover(req, res, next) {
  if (req.unidade) {
    req.unidade.destroy()
    res.json({
      message: 'unidade foi eliminado'
    })
  } else {
    res.json({
      message: 'unidade invalido'
    })
  }
}

/**
 * 
 * @param {*} id id será preenchido com o número que estiver na rota
 */
function carregar(req, res, next, id) {
  Unidade.findOne({
    where: {
      id: id
    }
  })
    //na linha abaixo é utilizado Arrow Functions no lugar da função "anônima" (function (unidade) { ... })
    //para saber mais sobre Arrow function acesse:
    //https://raphaelfabeni.com/es6-arrow-functions/
    .then((unidade) => {
      //armena o unidade na requisição, para que a próxima função
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
}