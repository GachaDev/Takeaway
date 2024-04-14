import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/entities/User';
import { UsersModule } from './users.module';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersModule) {}

    @Get()
    async findAll() {
        return await this.usersService.getAll();
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
