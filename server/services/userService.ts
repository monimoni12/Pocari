import prisma from '../db/connection';

export async function getAllUsers() {
    return await prisma.user.findMany();
}

export async function createUser(data: { name: string }) {
    return await prisma.user.create({
        data,
    });
}
