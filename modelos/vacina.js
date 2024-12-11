const Sequelize = require('sequelize');
const database = require('../db.js');

const Vacina = database.define('vacina', {
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
    obrigatoria: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
},
{
    tableName: 'vacina'
})

Vacina.associate = function(models){
}

module.exports = Vacina;