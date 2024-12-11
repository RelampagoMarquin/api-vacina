const { Vacina } = require('../modelos/');

function listarTodos(req, res, next) {
  //retorna todos os Vacinas cadastrados
  Vacina.findAll().then(function (listaVacinas) {
    res.json(listaVacinas);
  });
}


function cadastrar(req, res, next) {
  Vacina.create({
    nome: req.body.nome,
    obrigatoria: req.body.obrigatoria
  }).then((vacina) => {
    //se essa função for executada, o vacina foi cadastrado
    //envia para quem pediu o cadastro os dados do vacina cadastrado
    //isso inclui o ID que é autoincremento
    res.json(vacina);
  })
}

function listarApenasUm(req, res, next) {
  //verifica se o vacina foi encontrado pela função de carregar (executada anteriormente)
  if (req.vacina) {
    //envia o vacina que está armazenado na requisição
    res.json(req.vacina);
  } else {
    //caso não seja encontrada, enviará um erro 404 (NotFound) e uma mensagem
    res.status(404).json({
      message: 'O vacina informado não existe'
    })
  }
}

function alterar(req, res, next) {
  var nome = req.body.nome;
  var obrigatoria = req.body.obrigatoria;
  if (req.vacina) {
    if (req.vacina.nome != req.body.nome && nome != null) {
      req.vacina.nome = req.body.nome;
    } 
    if (req.vacina.obrigatoria != req.body.obrigatoria && obrigatoria != null) {
      req.vacina.obrigatoria = req.body.obrigatoria;
    } 
    req.vacina.save()
    res.json(req.vacina)
  } else {
    res.json({
      message: 'vacina invalido'
    })
  }
}

function remover(req, res, next) {
  if (req.vacina) {
    req.vacina.destroy()
    res.json({
      message: 'vacina foi eliminado'
    })
  } else {
    res.json({
      message: 'vacina invalido'
    })
  }
}

/**
 * 
 * @param {*} id id será preenchido com o número que estiver na rota
 */
function carregar(req, res, next, id) {
  Vacina.findOne({
    where: {
      id: id
    }
  })
    //na linha abaixo é utilizado Arrow Functions no lugar da função "anônima" (function (vacina) { ... })
    //para saber mais sobre Arrow function acesse:
    //https://raphaelfabeni.com/es6-arrow-functions/
    .then((vacina) => {
      //armena o vacina na requisição, para que a próxima função
      //consiga recuperá-lo
      req.vacina = vacina;
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