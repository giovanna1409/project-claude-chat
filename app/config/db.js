import { createPool } from 'mysql2/promise';

const pool = createPool({
    host: 'sql10.freesqldatabase.com',
    user: 'sql10711074',
    password: 'liWckGRl4M',
    database: 'sql10711074',
    waitForConnections: true,
    connectionLimit: 1,
    queueLimit: 0
});

export default pool;