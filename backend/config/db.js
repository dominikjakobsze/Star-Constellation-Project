const Sequelize = require('sequelize');
const config = require('./config.json');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env] || config['development'];

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect
    }
);

// Test the connection
sequelize
    .authenticate()
    .then(() => {
        console.log(`\n\nDatabase connection has been established successfully to (remote db) \x1b[31m${dbConfig.database}\x1b[0m mode: \x1b[34m${env}\x1b[0m.\n\n`);
    })
    .catch(error => {
        console.error('\n\nUnable to connect to the database:\n\n', error);
    });

sequelize.options.logging = false;

module.exports = {
    sequelize,
    env
}

