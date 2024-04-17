import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { IngredientsModule } from './ingredients.module';
import { Ingredient } from 'src/entities/Ingredient';

@Controller('ingredients')
export class IngredientsController {
    constructor(private readonly ingredientsService: IngredientsModule) {}

    @Get()
    async findAll() {
        return await this.ingredientsService.getAll();
    }

    @Post()
    async create(@Body() ingredient: Ingredient) {
        return await this.ingredientsService.create(ingredient);
    }

    @Put()
    async update(@Body() ingredient: Ingredient) {
        return await this.ingredientsService.update(ingredient);
    }

    @Delete(':id')
    async delete(@Param('id') id: number, @Res() res: Response) {
        const response = await this.ingredientsService.delete(id);

        if (response === 1) {
            return res.status(200).json(response);
        } else if (response === 0) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }
    }
}
