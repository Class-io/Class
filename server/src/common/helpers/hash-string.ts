import { hash } from 'bcrypt';

export async function hashString(text: string): Promise<string> {
    const hashedString: string = await hash(text, 12);
    return hashedString;
}