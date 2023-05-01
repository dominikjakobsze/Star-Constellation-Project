const request = require('supertest');
const app = require('../index');
const { sequelize } = require('../config/db');
const Star = require('../models/StarModel');
const Constellation = require("../models/ConstellationModel");
const fs = require('fs');
const path = require('path');

describe('POST /stars', () => {
    beforeEach(async () => {
        await Star.destroy({ where: {} });
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

    it('should create a new star and return 201 status code', async () => {
        const res = await request(app)
            .post('/stars')
            .field('name', 'Test Star')
            .field('description', 'Test Star Description')
            .attach('image', 'tests/file/image.png');

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('star');
        expect(res.body.star.linkToImage).toBeDefined();
    });

    it('should return 400 code, no name field', async () => {
        const res = await request(app)
            .post('/stars')
            .field('description', 'Test Star Description')
            .attach('image', 'tests/file/image.png');

        expect(res.statusCode).toEqual(400);
    });

    it('should return 500, not an image type', async () => {
        const res = await request(app)
            .post('/stars')
            .field('name', 'Test Star')
            .field('description', 'Test Star Description')
            .attach('image', 'tests/file/haker.js');

        expect(res.statusCode).toEqual(500);
    });
});

