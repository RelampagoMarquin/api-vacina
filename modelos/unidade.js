const Sequelize = require('sequelize');
const database = require('../db.js');

const Unidade = database.define('Unidade', {
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
    cnes: {
        type: Sequelize.STRING,
        allowNull: false
    },
    contato: {
        type: Sequelize.STRING,
        allowNull: false
    },
    vinculo: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    logradouro: {
        type: Sequelize.STRING,
        allowNull: false
    },
    numero: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bairro: {
        type: Sequelize.STRING,
        allowNull: false
    },
    municipio: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},
{
    tableName: 'unidade'
})

Unidade.associate = function(models){
}

module.exports = Unidade;