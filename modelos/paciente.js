const Sequelize = require('sequelize');
const database = require('../db.js');

const Paciente = database.define('paciente', {
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
    mae: {
        type: Sequelize.STRING,
        allowNull: false
    },
    contato: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dataNascimento: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
},
{
    tableName: 'paciente'
})

Paciente.associate = function(models){
}

module.exports = Paciente;