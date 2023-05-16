const express = require('express');
const router = express.Router();
const Planner = require('../models/PlannerModel');
const upload = require('../upload');

router.post('/planner', upload.none(), async (req, res, next) => {
    try {
      const { fog, rain, moon, clouds, date, stars, constellations } = req.body;
      if(fog < 0 || fog > 100){
        res.status(400).json({
          status_code: 400,
          message: 'Fog must be between 0 and 100',
          error: true
        });
        return;
      }
      const planner = new Planner({
        fog: fog,
        rain: rain,
        moon: moon,
        clouds: clouds,
        nightSkyDate: date,
        constellationList: constellations,
        starsList: stars
      });
      await planner.save();
      res.status(200).json({
        status_code: 200,
        planner: planner,
        error: false
    });
    } catch (error) {
      res.status(500).json({
        status_code: 500,
        message: 'Planner not saved',
        error: true
    });
    }
});  


module.exports = router;