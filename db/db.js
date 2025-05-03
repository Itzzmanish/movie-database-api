const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({
 user: process.env.PGUSER,
 password: process.env.PGPASSWORD,
 database: process.env.PGDATABASE,
 host: 'localhost',
 port: 5432
});
module.exports = pool;