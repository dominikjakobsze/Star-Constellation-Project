const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');


const Star = sequelize.define('Star', {
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

module.exports = Star;
