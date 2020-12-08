import { compare } from 'bcrypt';

export async function compareStringToHash(text: string, hash: string): Promise<boolean> {
    const result: boolean = await compare(text, hash);
    return result;
}