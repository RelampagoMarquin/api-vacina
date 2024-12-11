const { Paciente } = require('../modelos/');

function listarTodos(req, res, next) {
  //retorna todos os Pacientes cadastrados
  Paciente.findAll().then(function (listaPacientes) {
    res.json(listaPacientes);
  });
}


function cadastrar(req, res, next) {
  Paciente.create({
    nome: req.body.nome,
    mae: req.body.mae,
    dataNascimento: req.body.dataNascimento,
    contato: req.body.contato
  }).then((paciente) => {
    //se essa função for executada, o paciente foi cadastrado
    //envia para quem pediu o cadastro os dados do paciente cadastrado
    //isso inclui o ID que é autoincremento
    res.json(paciente);
  })
}

function listarApenasUm(req, res, next) {
  //verifica se o paciente foi encontrado pela função de carregar (executada anteriormente)
  if (req.paciente) {
    //envia o paciente que está armazenado na requisição
    res.json(req.paciente);
  } else {
    //caso não seja encontrada, enviará um erro 404 (NotFound) e uma mensagem
    res.status(404).json({
      message: 'O paciente informado não existe'
    })
  }
}

function alterar(req, res, next) {
  var nome = req.body.nome;
  var mae = req.body.mae;
  var contato = req.body.contato;
  var dataNascimento = req.body.dataNascimento;
  if (req.paciente) {
    if (req.paciente.nome != req.body.nome && nome != null) {
      req.paciente.nome = req.body.nome;
    } 
    if (req.paciente.mae != req.body.mae && mae != null) {
      req.paciente.mae = req.body.mae;
    } 
    if (req.paciente.contato != req.body.contato && contato != null) {
      req.paciente.contato = req.body.contato;
    }
    if (req.paciente.dataNascimento != req.body.dataNascimento && dataNascimento != null) {
      req.paciente.dataNascimento = req.body.dataNascimento;
    }
    req.paciente.save()
    res.json(req.paciente)
  } else {
    res.json({
      message: 'paciente invalido'
    })
  }
}

function remover(req, res, next) {
  if (req.paciente) {
    req.paciente.destroy()
    res.json({
      message: 'paciente foi eliminado'
    })
  } else {
    res.json({
      message: 'paciente invalido'
    })
  }
}

/**
 * 
 * @param {*} id id será preenchido com o número que estiver na rota
 */
function carregar(req, res, next, id) {
  Paciente.findOne({
    where: {
      id: id
    }
  })
    //na linha abaixo é utilizado Arrow Functions no lugar da função "anônima" (function (paciente) { ... })
    //para saber mais sobre Arrow function acesse:
    //https://raphaelfabeni.com/es6-arrow-functions/
    .then((paciente) => {
      //armena o paciente na requisição, para que a próxima função
      //consiga recuperá-lo
      req.paciente = paciente;
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