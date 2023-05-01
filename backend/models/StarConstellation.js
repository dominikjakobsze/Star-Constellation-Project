const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Star = require('./StarModel');
const Constellation = require('./ConstellationModel');

const StarConstellation = sequelize.define('StarConstellation', {
    starIdFK: {
        type: DataTypes.INTEGER,
        references: {
            model: Star,
            key: 'id',
        },
    },
    constellationIdFK: {
        type: DataTypes.INTEGER,
        references: {
            model: Constellation,
            key: 'id',
        },
    },
});

Star.belongsToMany(Constellation, {
    through: StarConstellation,
    foreignKey: 'starIdFK',
    otherKey: 'constellationIdFK',
    onDelete: 'CASCADE'
});

Constellation.belongsToMany(Star, {
    through: StarConstellation,
    foreignKey: 'constellationIdFK',
    otherKey: 'starIdFK',
    onDelete: 'CASCADE'
});

module.exports = StarConstellation;
