const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Planner = sequelize.define('Planner', {
    rain: {
        type: DataTypes.INTEGER
    },
    fog: {
        type: DataTypes.INTEGER
    },
    clouds: {
        type: DataTypes.INTEGER
    },
    moon: {
        type: DataTypes.INTEGER
    },
    starsList: {
        type: DataTypes.JSON
    },
    constellationList: {
        type: DataTypes.JSON
    },
    nightSkyDate: {
        type: DataTypes.DATE
    }
});

module.exports = Planner;
