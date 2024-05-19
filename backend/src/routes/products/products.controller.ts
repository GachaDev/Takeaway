import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Res,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { ProductsModule } from './products.module';
import { Product } from 'src/entities/Product';
import { Response } from 'express';
import { ProductIngredient } from 'src/entities/ProductIngredient';
import { Ingredient } from 'src/entities/Ingredient';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsModule) {
        this.ensureUploadsFolderExists();
    }

    private ensureUploadsFolderExists() {
        const uploadFolderPath = join(__dirname, '..', '..', '..', 'uploads');
        if (!existsSync(uploadFolderPath)) {
            mkdirSync(uploadFolderPath);
        }
    }

    @Get()
    async findAll() {
        return await this.productsService.getAll();
    }

    @Post()
    async create(@Body() product: Product & { ingredientsToAdd: Ingredient[] }) {
        return await this.productsService.create(product);
    }

    @Put()
    async update(@Body() product: Product) {
        return await this.productsService.update(product);
    }

    @Delete(':id')
    async delete(@Param('id') id: number, @Res() res: Response) {
        const response = await this.productsService.delete(id);

        if (response === 1) {
            return res.status(200).json(response);
        } else if (response === 0) {
            return res.status(404).json({ message: 'Product not found.' });
        }
    }

    @Post(':id/ingredients')
    async addIngredientToProduct(
        @Param('id') productId: number,
        @Body() productIngredient: ProductIngredient,
        @Res() res: Response
    ) {
        try {
            const response = await this.productsService.addIngredientToProduct(
                productId,
                productIngredient
            );
            return res.status(201).json(response);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('image'))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Param('id') id: string
    ): Promise<string> {
        if (!file) {
            throw new Error('No se ha proporcionado ningún archivo.');
        }

        const fileExtension = extname(file.originalname).toLowerCase();
        if (fileExtension !== '.webp') {
            throw new Error('Solo se admiten archivos de tipo webp');
        }

        try {
            return `${id}.webp`;
        } catch (error) {
            throw new Error(`Error al procesar la carga de archivos: ${error.message}`);
        }
    }

    @Get(':filename')
    async serveImage(@Param('filename') filename: string, @Res() res: Response) {
        try {
            const uploadsFolder = join(__dirname, '..', '..', '..', 'uploads');

            const imagePath = join(uploadsFolder, filename);

            return res.sendFile(imagePath);
        } catch (error) {
            return res.status(404).json({ message: 'Imagen no encontrada' });
        }
    }
}
