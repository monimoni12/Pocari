import { createPool } from 'mysql2/promise';

// MySQL 연결 설정
const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'smart_portfolio',
});

export default pool;
