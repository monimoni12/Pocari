import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllImages, uploadImage, processImage } from '../../server/services/imageService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const images = await getAllImages();
        res.status(200).json(images);
    } else if (req.method === 'POST') {
        const newImage = await uploadImage(req.body);
        res.status(201).json(newImage);
    } else if (req.method === 'PUT') {
        const { id } = req.body;
        await processImage(id);
        res.status(200).end('Image processed');
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
