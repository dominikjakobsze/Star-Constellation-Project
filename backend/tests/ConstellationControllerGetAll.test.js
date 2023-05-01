const request = require('supertest');
const app = require('../index');
const { sequelize } = require('../config/db');

const Star = require('../models/StarModel');
const Constellation = require("../models/ConstellationModel");

describe('GET /constellations', () => {
    beforeEach(async () => {
        await Constellation.destroy({ where: {} });
    });

    beforeAll(async () => {
        sequelize.options.logging = false;
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('responds with JSON array containing one constellation', async () => {
        const constellation = await Constellation.create({ name: 'Constellation 1' });
        const response = await request(app).get('/constellations');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('constellations_array');
        expect(Array.isArray(response.body.constellations_array)).toBe(true);
    });

    it('responds with JSON array of all constellations', async () => {
        const response = await request(app).get('/constellations');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('constellations_array');
        expect(Array.isArray(response.body.constellations_array)).toBe(true);
    });

    it('handles errors by returning a 500 status code', async () => {
        jest.spyOn(Constellation, 'findAll').mockRejectedValue(new Error('Database error'));
        const response = await request(app).get('/constellations');
        expect(response.statusCode).toBe(500);
        expect(response.body).toMatchObject({
            status_code: 500,
            message: 'All constellations',
            error: true,
        });
    });

});

