import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { CategoriesModule } from './categories.module';
import { Category } from 'src/entities/Category';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesModule) {}

    @Get()
    async findAll() {
        return await this.categoriesService.getAll();
    }

    @Post()
    async create(@Body() category: Category) {
        return await this.categoriesService.create(category);
    }

    @Put()
    async update(@Body() category: Category) {
        return await this.categoriesService.update(category);
    }

    @Delete(':id')
    async delete(@Param('id') id: number, @Res() res: Response) {
        const response = await this.categoriesService.delete(id);

        if (response === 1) {
            return res.status(200).json(response);
        } else if (response === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
    }
}
