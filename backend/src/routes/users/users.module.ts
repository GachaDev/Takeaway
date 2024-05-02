import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDAO } from 'src/DAO/UserDAO';
import { Hash } from 'src/components/utils/Hash';
import { User } from 'src/entities/User';
import { configJWT } from './const';

@Injectable()
export class UsersModule {
    DAO = new UserDAO();
    jwtService = new JwtService();

    async login({ email, password }: User): Promise<LoginResponse> {
        const user = await this.DAO.findByEmail(email);

        if (user) {
            if (user.password === Hash.generate(password)) {
                const token: string = await this.jwtService.signAsync(
                    {
                        id: user.id,
                        email: user.email,
                        employee: user.employee
                    },
                    configJWT
                );

                return { success: true, userId: user.id, token: token };
            } else {
                return { success: false };
            }
        }

        return { success: false };
    }

    async changePassword(body: { oldPassword: string; newPassword: string; userId: number }) {
        const user = await this.DAO.findById(body.userId);

        if (user.password === Hash.generate(body.oldPassword)) {
            user.password = Hash.generate(body.newPassword);
            await this.DAO.update(user);
            return { success: true };
        } else {
            return { success: false, message: 'Contraseña anterior incorrecta' };
        }
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
