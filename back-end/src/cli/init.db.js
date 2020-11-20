const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../', '.env') });

const configureDI = require('../config/di');

const container = configureDI();

const mainDb = container.get('Sequelize');
container.get('Session');

mainDb.sync();
