import { User } from 'src/entities/User';
import { DAO } from './DAO';

export class UserDAO extends DAO<User> {
    constructor() {
        super(User);
    }

    async findByEmail(email: string, relations?: string[]): Promise<User | null> {
        if (!email) return null;

        return this.repository.findOne({
            where: { email },
            relations: relations || []
        });
    }
}
