export function assignObject<T>(to: T, from: Partial<T>, fields: string[]): void {
    fields.forEach(field => {
        to[field] = from[field]
    });
}