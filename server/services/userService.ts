import pool from '../db/connection';

export async function getAllUsers() {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
}

export async function createUser(data: { name: string; email: string; password: string }) {
    const [result] = await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [data.name, data.email, data.password]);
    return result;
}
