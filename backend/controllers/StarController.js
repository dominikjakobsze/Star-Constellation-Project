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

//GET all stars
router.get('/stars', async (req, res, next) => {
    try {
        const stars = await Star.findAll();
        res.status(200).json({
            status_code: 200,
            stars_array: stars,
            message: 'All stars',
            error: false
        });
    } catch (err) {
        //console.error('Error fetching stars:', err);
        res.status(500).json({
            status_code: 500,
            message: 'All stars',
            error: true
        });
    }
});

//POST new star
router.post('/stars', upload.single('image'), async (req, res, next) => {
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
        const newStar = await Star.create({
            name: name,
            description: description,
            linkToImage: filePath,
            isShine: false,
            isOn: false
        });

        res.status(201).json({
            status_code: 201,
            star: newStar,
            message: 'Star created',
            error: false
        });
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: 'Error creating star',
            error: true
        });
    }
});

//PATCH star
router.patch('/stars/:id', upload.single('image'), async (req, res, next) => {
    const { name, description, isShine, isOn } = req.body;
    const { id } = req.params;
    const filePath = req.file ? req.file.filename : null;

    try {
        const star = await Star.findByPk(id);
        if(!star){
            return res.status(404).json({
                status_code: 404,
                message: 'Star not found',
                error: true
            });
        }
        if(name){
            star.name = name;
        }
        if(description){
            star.description = description;
        }
        if(isOn){
            star.isOn = Boolean(isOn);
        }
        if(isShine){
            star.isShine = Boolean(isShine);
        }
        if (filePath) {
            try {
                const files = await fs.promises.readdir(uploadsDir);
                // console.log(star.linkToImage);
                const fileToDelete = files.find(file => file === star.linkToImage);
                if (fileToDelete) {
                    const filePathToDelete = path.join(uploadsDir, fileToDelete);
                    // console.log(filePathToDelete);
                    // console.log(fileToDelete);
                    await fs.promises.unlink(filePathToDelete);
                    // console.log(`Deleted file: ${filePathToDelete}`);
                    star.linkToImage = filePath;
                }
            } catch (err) {
                res.status(500).json({
                    status_code: 500,
                    message: 'Error updating star',
                    error: true
                });
            }
        }
        await star.save();
        res.status(200).json({
            status_code: 200,
            star: star,
            message: `Star with ID ${id} updated`,
            error: false
        });
    } catch(error) {
        res.status(500).json({
            status_code: 500,
            message: 'Error updating star',
            error: true
        });
    }
});

//GET star by ID
router.get('/stars/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const star = await Star.findByPk(id);
        if(!star){
            return res.status(404).json({
                status_code: 404,
                message: 'Star not found',
                error: true
            });
        }
        res.status(200).json({
            status_code: 200,
            star: star,
            message: `Star with ID ${id}`,
            error: false
        });
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: 'Error getting star',
            error: true
        });
    }
});

//DELETE star by ID
router.delete('/stars/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const star = await Star.findByPk(id);
        if(!star){
            return res.status(404).json({
                status_code: 404,
                message: 'Star not found',
                error: true
            });
        }
        await star.destroy();
        res.status(200).json({
            status_code: 200,
            message: `Star with ID ${id} deleted`,
            error: false
        });
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: 'Error deleting star',
            error: true
        });
    }
});

router.get('/test', async (req, res, next) => {
    if(await Star.count() < 10){
        for(let i = 0; i <= 10; i++){
            await Star.create({
                name: 'Test star',
                description: 'Test description',
                linkToImage: 'test.jpg',
            });
            await Constellation.create({
                name: 'Test constellation',
                description: 'Test description',
                linkToImage: 'test.jpg',
            });
        }
    }
    await StarConstellation.create({
        starIdFK: Math.floor(Math.random() * 9) + 1,
        constellationIdFK: Math.floor(Math.random() * 9) + 1
    });
    res.json({
        data: await StarConstellation.findAll()
    });
});

module.exports = router;
