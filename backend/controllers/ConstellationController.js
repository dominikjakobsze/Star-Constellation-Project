const express = require('express');
const router = express.Router();
const Star = require('../models/StarModel');
const Constellation = require('../models/ConstellationModel');
const StarConstellation = require('../models/StarConstellation');
const {sequelize, env} = require("../config/db");
const upload = require('../upload');
const fs = require('fs');
const path = require('path');

let uploadsDir;
if(env === 'test'){
    uploadsDir = path.join(__dirname, '..', 'tests/uploads-test');
} else {
    uploadsDir = path.join(__dirname, '..', 'uploads');
}

//GET all constellation
router.get('/constellations', async (req, res, next) => {
    try {
        const constellations = await Constellation.findAll();
        res.status(200).json({
            status_code: 200,
            constellations_array: constellations,
            message: 'All constellations',
            error: false
        });
    } catch (err) {
        res.status(500).json({
            status_code: 500,
            message: 'All constellations',
            error: true
        });
    }
});

//POST new constellation
router.post('/constellations', upload.single("image"), async (req, res, next) => {
    const { name, description } = req.body;
    const filePath = req.file ? req.file.filename : null;

    if (!name || !description || !filePath) {
        return res.status(400).json({
            status_code: 400,
            message: 'Please provide name, description and image',
            error: true
        });
    }

    try {
        const newConstellation = await Constellation.create({
            name: name,
            description: description,
            linkToImage: filePath,
            isShine: false,
            isOn: false
        });

        res.status(201).json({
            status_code: 201,
            constellation: newConstellation,
            message: 'Constellation created',
            error: false
        });
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: 'Error creating constellation',
            error: true
        });
    }
});

//PATCH constellation
router.patch('/constellations/:id', upload.single('image'), async (req, res, next) => {
    const { name, description, isShine, isOn } = req.body;
    const { id } = req.params;
    const filePath = req.file ? req.file.filename : null;

    try {
        const constellation = await Constellation.findByPk(id);
        if(!constellation){
            return res.status(404).json({
                status_code: 404,
                message: 'Constellation not found',
                error: true
            });
        }
        if(name){
            constellation.name = name;
        }
        if(description){
            constellation.description = description;
        }
        if(isOn){
            constellation.isOn = Boolean(isOn);
        }
        if(isShine){
            constellation.isShine = Boolean(isShine);
        }
        if (filePath) {
            try {
                const files = await fs.promises.readdir(uploadsDir);
                const fileToDelete = files.find(file => file === constellation.linkToImage);
                if (fileToDelete) {
                    const filePathToDelete = path.join(uploadsDir, fileToDelete);
                    await fs.promises.unlink(filePathToDelete);
                    constellation.linkToImage = filePath;
                }
            } catch (err) {
                res.status(500).json({
                    status_code: 500,
                    message: 'Error updating constellation',
                    error: true
                });
            }
        }
        await constellation.save();
        res.status(200).json({
            status_code: 200,
            constellation: constellation,
            message: `Constellation with ID ${id} updated`,
            error: false
        });
    } catch(error) {
        res.status(500).json({
            status_code: 500,
            message: 'Error updating constellation',
            error: true
        });
    }
});

//GET constellation by ID
router.get('/constellations/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const constellation = await Constellation.findByPk(id);
        if(!constellation){
            return res.status(404).json({
                status_code: 404,
                message: 'Constellation not found',
                error: true
            });
        }
        res.status(200).json({
            status_code: 200,
            constellation: constellation,
            message: `Constellation with ID ${id}`,
            error: false
        });
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: 'Error getting constellation',
            error: true
        });
    }
});

//DELETE constellation by ID
router.delete('/constellations/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const constellation = await Constellation.findByPk(id);
        if(!constellation){
            return res.status(404).json({
                status_code: 404,
                message: 'Constellation not found',
                error: true
            });
        }
        await constellation.destroy();
        res.status(200).json({
            status_code: 200,
            message: `Constellation with ID ${id} deleted`,
            error: false
        });
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: 'Error deleting constellation',
            error: true
        });
    }
});

module.exports = router;
