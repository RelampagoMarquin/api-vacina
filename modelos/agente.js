const Sequelize = require('sequelize');
const database = require('../db.js');

const Agente = database.define('agente', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    contato: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    //se continuar é bom criptografar isso
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    unidadeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'unidade',
            key: 'id'
        }
    },
},
{
    tableName: "agente"
})
Agente.associate = function(models){
    Agente.hasMany(models.Vacinacao)
    Agente.belongsTo(models.Unidade);
}
    
module.exports = Agente;