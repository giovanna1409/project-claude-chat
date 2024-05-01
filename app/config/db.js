import { createPool } from 'mysql2/promise';

const pool = createPool({
    host: '35.199.126.126',
    user: 'root',
    database: 'chat'
});

export default pool;