const request = require('supertest');
const app = require('../index');
const { sequelize } = require('../config/db');
const Star = require('../models/StarModel');
const Constellation = require("../models/ConstellationModel");
const fs = require('fs');
const path = require('path');

describe('PATCH /constellations/1', () => {
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

    it('should update existing constellation of id 1', async () => {
        const res = await request(app)
            .post('/constellations')
            .field('name', 'Test Constellation')
            .field('description', 'Test Constellation Description')
            .attach('image', 'tests/file/image.png');

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('constellation');
        expect(res.body.constellation.linkToImage).toBeDefined();

        const res2 = await request(app)
            .patch('/constellations/1')
            .field('name', 'Test Constellation Updated')
            .field('isShine', 'true')
            .attach('image', 'tests/file/image.png');

        expect(res2.statusCode).toEqual(200);
        expect(res2.body).toHaveProperty('constellation');
        expect(res2.body.constellation.name).toEqual('Test Constellation Updated');
        expect(res2.body.constellation.isShine).toEqual(true);
        expect(res2.body.constellation.linkToImage).toBeDefined();
    });
});

