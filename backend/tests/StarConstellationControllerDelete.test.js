const request = require('supertest');
const app = require('../index');
const { sequelize } = require('../config/db');

const Star = require('../models/StarModel');
const Constellation = require("../models/ConstellationModel");
const StarConstellation = require("../models/StarConstellation");
const path = require("path");
const fs = require("fs");

describe('DELETE /star-constellation/star/:starId/constellation/:constellationId', () => {
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

    it('should delete association between star and constellation', async () => {
        const star = await Star.create({ name: 'Star1' });
        const constellation = await Constellation.create({ name: 'Constellation1' });
        await StarConstellation.create({
            starIdFK: star.id,
            constellationIdFK: constellation.id
        });

        const response = await request(app).delete(`/star-constellation/star/${star.id}/constellation/${constellation.id}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe(`Association between Constellation ${constellation.name} and Star ${star.name} deleted`);

        const association = await StarConstellation.findOne({
            where: {
                starIdFK: star.id,
                constellationIdFK: constellation.id
            }
        });
        expect(association).toBeNull();
    });

    it('should return 404 if star or constellation is not found', async () => {
        const star = await Star.create({ name: 'Star1' });
        const constellation = await Constellation.create({ name: 'Constellation1' });

        const response1 = await request(app).delete(`/star-constellation/star/${star.id}/constellation/123`);
        expect(response1.status).toBe(404);
        expect(response1.body.message).toBe('Star or constellation not found');

        const response2 = await request(app).delete(`/star-constellation/star/123/constellation/${constellation.id}`);
        expect(response2.status).toBe(404);
        expect(response2.body.message).toBe('Star or constellation not found');
    });

    it('should return 404 if association is not found', async () => {
        const star = await Star.create({ name: 'Star1' });
        const constellation = await Constellation.create({ name: 'Constellation1' });

        const response = await request(app).delete(`/star-constellation/star/${star.id}/constellation/${constellation.id}`);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe(`Association between Constellation ${constellation.name} and Star ${star.name} not found`);
    });

    it('should return 500 if server error occurs', async () => {
        jest.spyOn(Star, 'findByPk').mockImplementation(() => { throw new Error('Error message') });
        const star = await Star.create({ name: 'Star1' });
        const constellation = await Constellation.create({ name: 'Constellation1' });

        const response = await request(app).delete(`/star-constellation/star/${star.id}/constellation/${constellation.id}`);

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Error deleting association between Star and Constellation');
    });
});


