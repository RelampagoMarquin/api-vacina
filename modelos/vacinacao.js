const Sequelize = require('sequelize');
const database = require('../db.js');

const Vacinacao = database.define('vacinacao', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    reforco: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    dataAplicacao: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    remarcada: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    agenteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'agente',
            key: 'id'
        }
    },
    vacinaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'vacina',
            key: 'id'
        }
    },
    pacieteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'paciente',
            key: 'id'
        }
    },
},
{
  tableName: 'vacinacao'
})
Vacinacao.associate = function(models) {
    Vacinacao.belongsTo(models.Paciente);
    Vacinacao.belongsTo(models.Agente);
    Vacinacao.belongsTo(models.Vacina);
}
module.exports = Vacinacao;