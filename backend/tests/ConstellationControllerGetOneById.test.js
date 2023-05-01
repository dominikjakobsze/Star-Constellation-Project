const request = require('supertest');
const app = require('../index');
const { sequelize } = require('../config/db');

const Star = require('../models/StarModel');
const Constellation = require("../models/ConstellationModel");
const path = require("path");
const fs = require("fs");

describe('GET /constellations/1', () => {
    beforeEach(async () => {
        await Constellation.destroy({ where: {} });
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

    it('should return 404 if constellation does not exist', async () => {
        const res = await request(app).get('/constellations/1');
        expect(res.status).toBe(404);
    });

    it('should return 200 with constellation deatils of id 1', async () => {
        const res = await request(app)
            .post('/constellations')
            .field('name', 'Test Constellation')
            .field('description', 'Test Constellation Description')
            .attach('image', 'tests/file/image.png');

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('constellation');
        expect(res.body.constellation.linkToImage).toBeDefined();

        const res2 = await request(app).get('/constellations/1');
        expect(res2.status).toBe(200);
        expect(res2.body).toHaveProperty('constellation');
    });

});

