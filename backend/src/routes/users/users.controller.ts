import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/entities/User';
import { UsersModule } from './users.module';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersModule) {}

    @Post('login')
    async authLogin(@Body() user: User, @Res() res: Response) {
        const auth = await this.usersService.login(user);

        if (auth.success) {
            res.status(HttpStatus.OK).json(auth);
        } else {
            res.status(HttpStatus.NOT_FOUND).json(auth);
        }
    }

    @Post('changePassword')
    async changePassword(
        @Body() body: { oldPassword: string; newPassword: string; userId: number },
        @Res() res: Response
    ) {
        const changedPassword = await this.usersService.changePassword(body);

        if (changedPassword.success) {
            res.status(HttpStatus.OK).json(changedPassword);
        } else {
            res.status(HttpStatus.NOT_FOUND).json(changedPassword);
        }
    }

    @Post()
    async create(@Body() user: User) {
        return await this.usersService.create(user);
    }

    @Put()
    async update(@Body() user: User) {
        return await this.usersService.update(user);
    }

    @Delete(':id')
    async delete(@Param('id') id: number, @Res() res: Response) {
        const response = await this.usersService.delete(id);

        if (response === 1) {
            return res.status(200).json(response);
        } else if (response === 0) {
            return res.status(404).json({ message: 'user not found' });
        }
    }
}
