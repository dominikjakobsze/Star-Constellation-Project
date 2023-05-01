const request = require('supertest');
const app = require('../index');
const { sequelize } = require('../config/db');

const Star = require('../models/StarModel');
const Constellation = require("../models/ConstellationModel");

describe('GET /stars', () => {
    beforeEach(async () => {
        await Star.destroy({ where: {} });
    });

    beforeAll(async () => {
        sequelize.options.logging = false;
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('responds with JSON array containing one star', async () => {
        const star = await Star.create({ name: 'Star 1' });
        const response = await request(app).get('/stars');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('stars_array');
        expect(Array.isArray(response.body.stars_array)).toBe(true);
    });

    it('responds with JSON array of all stars', async () => {
        const response = await request(app).get('/stars');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('stars_array');
        expect(Array.isArray(response.body.stars_array)).toBe(true);
    });

    it('handles errors by returning a 500 status code', async () => {
        jest.spyOn(Star, 'findAll').mockRejectedValue(new Error('Database error'));

        const response = await request(app).get('/stars');
        expect(response.statusCode).toBe(500);
        expect(response.body).toMatchObject({
            status_code: 500,
            message: 'All stars',
            error: true,
        });
    });

});

