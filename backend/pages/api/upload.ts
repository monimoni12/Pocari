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