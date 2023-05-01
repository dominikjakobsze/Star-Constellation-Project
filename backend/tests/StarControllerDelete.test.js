const request = require('supertest');
const app = require('../index');
const { sequelize } = require('../config/db');

const Star = require('../models/StarModel');
const Constellation = require("../models/ConstellationModel");
const path = require("path");
const fs = require("fs");

describe('DELETE /stars/1', () => {
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

    it('should return 404 if star does not exist', async () => {
        const res = await request(app).delete('/stars/1');
        expect(res.status).toBe(404);
    });

    it('should delete a star of id 1', async () => {
        const res = await request(app)
            .post('/stars')
            .field('name', 'Test Star')
            .field('description', 'Test Star Description')
            .attach('image', 'tests/file/image.png');

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('star');
        expect(res.body.star.linkToImage).toBeDefined();

        const res2 = await request(app).delete('/stars/1');
        expect(res2.status).toBe(200);
    });

});

