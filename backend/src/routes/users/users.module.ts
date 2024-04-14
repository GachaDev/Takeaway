import { Injectable } from '@nestjs/common';
import { DAO } from 'src/DAO/DAO';
import { Hash } from 'src/components/utils/Hash';
import { User } from 'src/entities/User';

@Injectable()
export class UsersModule {
    DAO: DAO<User> = new DAO<User>(User);

    getAll(): Promise<User[]> {
        return this.DAO.findAll();
    }

    create(user: User): Promise<CreateResponse> {
        user.password = Hash.generate(user.password);
        return this.DAO.create(user);
    }

    update(user: User): Promise<number> {
        return this.DAO.update(user);
    }

    delete(id: number): Promise<number> {
        return this.DAO.delete(id);
    }
}
