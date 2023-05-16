const express = require('express');
const router = express.Router();
const Planner = require('../models/PlannerModel');
const upload = require('../upload');

router.post('/planner', upload.none(), async (req, res, next) => {
    try {
      const { fog, rain, moon, clouds, date, stars, constellations } = req.body;
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while saving the planner data' });
    }
});  


module.exports = router;