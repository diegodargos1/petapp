// const Sequelize = require( 'sequelize' );
// const dbConfig = require( '../config/database' );

// const User = require( '../models/User' );
// const Store = require( '../models/Store' );
// const StoreLocation = require( '../models/StoreLocation' );

// const connection = new Sequelize( dbConfig );

// User.init( connection );
// Store.init( connection );
// StoreLocation.init( connection );

// module.exports = connection;

import {createConnection} from 'typeorm';

createConnection();