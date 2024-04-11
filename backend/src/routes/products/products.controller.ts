import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ProductsModule } from './products.module';
import { Products } from 'src/entities/Products';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsModule) {}

    @Get()
    async findAll() {
        return await this.productsService.getAll();
    }

    @Post()
    async create(@Body() product: Products) {
        return await this.productsService.create(product);
    }

    @Put()
    async update(@Body() product: Products) {
        return await this.productsService.update(product);
    }

    @Delete(':id')
    async delete(@Param('id') id: number, @Res() res: Response) {
        const response = await this.productsService.delete(id);

        if (response === 1) {
            return res.status(200).json(response);
        } else if (response === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
    }
}
