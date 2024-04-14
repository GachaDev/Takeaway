import { createHash } from 'crypto';

export class Hash {
    static generate(password: string) {
        const hash = createHash('sha512');
        hash.update(password);

        return hash.digest('hex');
    }
}
