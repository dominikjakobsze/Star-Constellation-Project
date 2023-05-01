const request = require('supertest');
const app = require('../index');
const { sequelize } = require('../config/db');

const Star = require('../models/StarModel');
const Constellation = require("../models/ConstellationModel");
const StarConstellation = require("../models/StarConstellation");
const path = require("path");
const fs = require("fs");

describe('GET /star-constellation/star/1', () => {
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

    it('should return a star with a valid ID', async () => {
        const star = await Star.create({ name: 'Star1' });
        const constellation = await Constellation.create({ name: 'Constellation1' });
        await StarConstellation.create({
            starIdFK: star.id,
            constellationIdFK: constellation.id
        });
        const res = await request(app).get(`/star-constellation/star/${star.id}`);
        expect(res.status).toBe(200);
        expect(res.body.status_code).toBe(200);
        expect(res.body.error).toBe(false);
        expect(res.body.data.id).toBe(star.id);
        expect(res.body.data.name).toBe(star.name);
        expect(res.body.data.Constellations[0].name).toBe(constellation.name);
    });
      
    it('should return a 404 error when getting a star with an invalid ID', async () => {
        const res = await request(app).get('/star-constellation/star/999');
        expect(res.status).toBe(404);
        expect(res.body.status_code).toBe(404);
        expect(res.body.error).toBe(true);
        expect(res.body.message).toBe('Star not found');
    });
    
    it('should handle server errors when getting a star', async () => {
        Star.findByPk = jest.fn(() => {
          throw new Error('Mock error');
        });
      
        const res = await request(app).get('/star-constellation/star/1');
        expect(res.status).toBe(500);
        expect(res.body.status_code).toBe(500);
        expect(res.body.error).toBe(true);
        expect(res.body.message).toBe('Error getting star');
    });
      
});

