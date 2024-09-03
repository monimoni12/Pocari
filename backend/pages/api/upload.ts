/*
// pages/api/upload.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // 1. 이미지 처리 로직
        // 업로드된 이미지를 처리하는 로직(이미지를 저장 | chatgpt에 전달)

        const { image } = req.body;

        // 2. 처리 결과를 응답으로 반환
        res.status(200).json({ result: '이미지 처리 결과' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
*/

import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// formidable을 사용 위해 bodyParser 비활성화
export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const form = new formidable.IncomingForm();

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Error parsing the file', err);
                return res.status(500).send('Server Error');
            }

            const file = files.image as formidable.File;
            const data = fs.readFileSync(file.filepath);
            const uploadDir = path.join(process.cwd(), 'uploads');

            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir); // 디렉토리가 존재하지 않으면 생성
            }

            const savePath = path.join(uploadDir, file.originalFilename || 'uploaded_image.jpg');

            try {
                fs.writeFileSync(savePath, data);
                res.status(200).json({ result: 'Image uploaded successfully', filePath: savePath });
            } catch (error) {
                console.error('Error saving the file', error);
                res.status(500).send('Server Error');
            }
        });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
