import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { EmployeesModule } from './employees.module';
import { Employee } from 'src/entities/Employee';

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesModule) {}

    @Get()
    async findAll() {
        return await this.employeesService.getAll();
    }

    @Post()
    async create(@Body() employee: Employee) {
        return await this.employeesService.create(employee);
    }

    @Put()
    async update(@Body() employee: Employee) {
        return await this.employeesService.update(employee);
    }

    @Delete(':id')
    async delete(@Param('id') id: number, @Res() res: Response) {
        const response = await this.employeesService.delete(id);

        if (response === 1) {
            return res.status(200).json(response);
        } else if (response === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
    }
}
