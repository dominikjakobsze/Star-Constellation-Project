const express = require('express');
const router = express.Router();
const Star = require('../models/StarModel');
const Constellation = require('../models/ConstellationModel');
const StarConstellation = require('../models/StarConstellation');
const {sequelize, env} = require("../config/db");
const upload = require('../upload');
const fs = require('fs');
const path = require('path');

router.get('/star-constellation/star/:id', async (req, res, next) => {
    try {
        const star = await Star.findByPk(req.params.id, {
            include: [{
                model: Constellation,
                through: {
                    attributes: []
                },
            }]
        });
        if (!star) {
            return res.status(404).json({
                status_code: 404,
                message: 'Star not found',
                error: true
            });
        }
        res.status(200).json({
            status_code: 200,
            data: star,
            error: false
        });
    } catch (err) {
        res.status(500).json({
            status_code: 500,
            message: 'Error getting star',
            error: true
        });
    }
});


router.get('/star-constellation/constellation/:id', async (req, res, next) => {
    try {
        const constellation = await Constellation.findByPk(req.params.id, {
            include: [{
                model: Star,
                through: {
                    attributes: []
                },
            }]
        });
        if (!constellation) {
            return res.status(404).json({
                status_code: 404,
                message: 'Constellation not found',
                error: true
            });
        }
        res.status(200).json({
            status_code: 200,
            data: constellation,
            error: false
        });
    } catch (err) {
        res.status(500).json({
            status_code: 500,
            message: 'Error getting constellation',
            error: true
        });
    }
});


router.post('/star-constellation/star/:starId/constellation/:constellationId', async (req, res, next) => {
    try {
        const star = await Star.findByPk(req.params.starId);
        const constellation = await Constellation.findByPk(req.params.constellationId);
        if (!star || !constellation) {
            return res.status(404).json({
                status_code: 404,
                message: 'Star or constellation not found',
                error: true
            });
        }
        const existingAssociation = await StarConstellation.findOne({
            where: {
                starIdFK: star.id,
                constellationIdFK: constellation.id
            }
        });
        if (existingAssociation) {
            return res.status(409).json({
                status_code: 409,
                message: `Association between Constellation ${constellation.name} and Star ${star.name} already exists`,
                error: true
            });
        }
        await StarConstellation.create({
            starIdFK: star.id,
            constellationIdFK: constellation.id
        });
        res.status(200).json({
            status_code: 200,
            message: `Association between Constellation ${constellation.name} and Star ${star.name} added`,
            error: false
        });
    } catch (err) {
        res.status(500).json({
            status_code: 500,
            message: 'Error adding association between Star and Constellation',
            error: true
        });
    }
});


router.delete('/star-constellation/star/:starId/constellation/:constellationId', async (req, res, next) => {
    try {
        const star = await Star.findByPk(req.params.starId);
        const constellation = await Constellation.findByPk(req.params.constellationId);
        if (!star || !constellation) {
            return res.status(404).json({
                status_code: 404,
                message: 'Star or constellation not found',
                error: true
            });
        }
        const result = await StarConstellation.destroy({
            where: {
                starIdFK: star.id,
                constellationIdFK: constellation.id
            }
        });
        if (result === 0) {
            return res.status(404).json({
                status_code: 404,
                message: `Association between Constellation ${constellation.name} and Star ${star.name} not found`,
                error: true
            });
        }
        res.status(200).json({
            status_code: 200,
            message: `Association between Constellation ${constellation.name} and Star ${star.name} deleted`,
            error: false
        });
    } catch (err) {
        res.status(500).json({
            status_code: 500,
            message: 'Error deleting association between Star and Constellation',
            error: true
        });
    }
});


module.exports = router;