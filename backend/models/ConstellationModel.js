const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Constellation = sequelize.define('Constellation', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    linkToImage: {
        type: DataTypes.STRING
    },
    isShine: {
        type: DataTypes.BOOLEAN
    },
    isOn: {
        type: DataTypes.BOOLEAN
    }
});

module.exports = Constellation;
