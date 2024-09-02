import pool from '../db/connection';
import { exec } from 'child_process';
import util from 'util';

const execAsync = util.promisify(exec);

export async function getAllImages() {
    const [rows] = await pool.query('SELECT * FROM images');
    return rows;
}

export async function uploadImage(data: { user_id: number; image_url: string }) {
    const [result] = await pool.query('INSERT INTO images (user_id, image_url) VALUES (?, ?)', [data.user_id, data.image_url]);
    return result;
}

export async function processImage(imageId: number) {
    const [rows] = await pool.query('SELECT * FROM images WHERE id = ?', [imageId]);
    const image = rows[0];

    if (image) {
        // 이미지 처리 로직 (예: OpenCV를 사용한 전처리)
        await execAsync(`python process_image.py ${image.image_url}`);
        await pool.query('UPDATE images SET processed = ? WHERE id = ?', [true, imageId]);
    }
}
