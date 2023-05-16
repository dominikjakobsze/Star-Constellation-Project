const express = require('express');
const router = express.Router();
const Planner = require('../models/PlannerModel');
const upload = require('../upload');
const { Op } = require('sequelize');

router.post('/planner', upload.none(), async (req, res, next) => {
    try {
      const { fog, rain, moon, clouds, date, stars, constellations } = req.body;
      const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
      if(!date.match(dateFormatRegex)){
        res.status(400).json({
          status_code: 400,
          message: 'Date must be in format YYYY-MM-DD',
          error: true
        });
        return;
      }
      const adjustedDate = new Date(date);
      if(Number(fog) < 0 || Number(fog) > 100){
        res.status(400).json({
          status_code: 400,
          message: 'Fog must be between 0 and 100',
          error: true
        });
        return;
      }
      if(Number(rain) < 0 || Number(rain) > 100){
        res.status(400).json({
          status_code: 400,
          message: 'Rain must be between 0 and 100',
          error: true
        });
        return;
      }
      if(Number(clouds) == 0 && Number(rain) > 0){
        res.status(400).json({
          status_code: 400,
          message: 'Rain cannot be greater than 0 when clouds are equal to 0',
          error: true
        });
        return;
      }
      if(Number(clouds) < 0 || Number(clouds) > 100){
        res.status(400).json({
          status_code: 400,
          message: 'Clouds must be between 0 and 100',
          error: true
        });
        return;
      }
      if(Number(moon) < 0 || Number(moon) > 4){
        res.status(400).json({
          status_code: 400,
          message: 'Moon must be between 1 and 4',
          error: true
        });
        return;
      }
      const existingPlanner = await Planner.findOne({
        where: {
          nightSkyDate: adjustedDate,
        }
      });
      if(existingPlanner){
        await Planner.destroy({
          where: {
            id: existingPlanner.id
          }
        });
      }
      const planner = new Planner({
        fog: fog,
        rain: rain,
        moon: moon,
        clouds: clouds,
        nightSkyDate: adjustedDate,
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