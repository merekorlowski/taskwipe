const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/engineering_outreach';

// list of queries