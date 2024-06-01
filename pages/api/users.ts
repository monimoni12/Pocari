import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllUsers, createUser } from '../../server/services/userService';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        const users = await getAllUsers();
        res.status(200).json(users);
    } else if (req.method === 'POST') {
        const newUser = await createUser(req.body);
        res.status(201).json(newUser);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
