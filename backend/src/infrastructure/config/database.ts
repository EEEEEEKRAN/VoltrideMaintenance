import { Pool } from 'pg';

const pool = new Pool({
    user: 'voltride',
    host: 'localhost',
    database: 'voltride',
    password: 'voltride',
    port: 5432,
});

export default pool;