import type { NextApiRequest, NextApiResponse } from 'next';
import { analyzeImage } from '../../server/services/analyzeService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { filePath } = req.body;

        if (!filePath) {
            return res.status(400).json({ message: 'Image path is required' });
        }

        try {
            const analysisResult = await analyzeImage(filePath);
            res.status(200).json({ result: analysisResult });
        } catch (error) {
            res.status(500).json({ message: 'Failed to analyze image', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
