const request = require('supertest');
const app = require('../index');
const { sequelize } = require('../config/db');

const Star = require('../models/StarModel');
const Constellation = require("../models/ConstellationModel");
const StarConstellation = require("../models/StarConstellation");
const path = require("path");
const fs = require("fs");

describe('POST /star-constellation/star/:starId/constellation/:constellationId', () => {
    beforeEach(async () => {
        await Constellation.destroy({ where: {} });
        await Star.destroy({ where: {} });
        await StarConstellation.destroy({ where: {} });
    });

    beforeAll(async () => {
        sequelize.options.logging = false;
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        // Delete all files from uploads-test folder
        const uploadsDir = path.join(__dirname, '..', 'tests/uploads-test');

        const files = await fs.promises.readdir(uploadsDir);
        await Promise.all(files.map(f => fs.promises.unlink(path.join(uploadsDir, f))));

        await sequelize.close();
    });
    
    it('should create a new association between a star and constellation', async () => {
        const star = await Star.create({
          name: 'Star 1'
        });
        const constellation = await Constellation.create({
          name: 'Constellation 1'
        });
        const res = await request(app)
          .post(`/star-constellation/star/${star.id}/constellation/${constellation.id}`)
          .send();
        expect(res.status).toBe(200);
        expect(res.body.message).toBe(`Association between Constellation ${constellation.name} and Star ${star.name} added`);
        const association = await StarConstellation.findOne({
          where: {
            starIdFK: star.id,
            constellationIdFK: constellation.id
          }
        });
        expect(association).not.toBeNull();
      });

      it('should create a new association between a star and constellation', async () => {
        const star = await Star.create({
          name: 'Star 1'
        });
        const constellation = await Constellation.create({
          name: 'Constellation 1'
        });
        const res = await request(app)
          .post(`/star-constellation/star/${star.id}/constellation/${constellation.id}`)
          .send();
        expect(res.status).toBe(200);
        expect(res.body.message).toBe(`Association between Constellation ${constellation.name} and Star ${star.name} added`);
        const association = await StarConstellation.findOne({
          where: {
            starIdFK: star.id,
            constellationIdFK: constellation.id
          }
        });
        expect(association).not.toBeNull();
      });

      it('should return an error message when the association already exists', async () => {
        const star = await Star.create({
          name: 'Star 1'
        });
        const constellation = await Constellation.create({
          name: 'Constellation 1'
        });
        await StarConstellation.create({
          starIdFK: star.id,
          constellationIdFK: constellation.id
        });
        const res = await request(app)
          .post(`/star-constellation/star/${star.id}/constellation/${constellation.id}`)
          .send();
        expect(res.status).toBe(409);
        expect(res.body.message).toBe(`Association between Constellation ${constellation.name} and Star ${star.name} already exists`);
      });

      it('should return 404 error for non-existing star ID', async () => {
        const res = await request(app)
          .post('/star-constellation/star/100/constellation/1')
          .send();
      
        expect(res.status).toBe(404);
        expect(res.body).toEqual({
          status_code: 404,
          message: 'Star or constellation not found',
          error: true
        });
      });

      it('should return 404 error for non-existing constellation ID', async () => {
        const res = await request(app)
          .post('/star-constellation/star/1/constellation/100')
          .send();
      
        expect(res.status).toBe(404);
        expect(res.body).toEqual({
          status_code: 404,
          message: 'Star or constellation not found',
          error: true
        });
      });

      it('should return 409 error for existing association between star and constellation', async () => {
        const star = await Star.create({
          name: 'Star 1'
        });
      
        const constellation = await Constellation.create({
          name: 'Constellation 1'
        });

        await StarConstellation.create({
          starIdFK: star.id,
          constellationIdFK: constellation.id
        });
      
        const res = await request(app)
          .post(`/star-constellation/star/${star.id}/constellation/${constellation.id}`)
          .send();
      
        expect(res.status).toBe(409);
        expect(res.body).toEqual({
          status_code: 409,
          message: `Association between Constellation ${constellation.name} and Star ${star.name} already exists`,
          error: true
        });
      });
      
      it('should create a new association between star and constellation', async () => {
        // Create a star and constellation
        const star = await Star.create({
          name: 'Star 1'
        });
      
        const constellation = await Constellation.create({
          name: 'Constellation 1'
        });
    
        const res = await request(app)
          .post(`/star-constellation/star/${star.id}/constellation/${constellation.id}`)
          .send();
          
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
          status_code: 200,
          message: `Association between Constellation ${constellation.name} and Star ${star.name} added`,
          error: false
        });
        const association = await StarConstellation.findOne({
          where: {
            starIdFK: star.id,
            constellationIdFK: constellation.id
          }
        });
      
        expect(association).not.toBeNull();
      });      
      
});

