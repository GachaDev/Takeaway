import { Injectable } from '@nestjs/common';
import { DAO } from 'src/DAO/DAO';
import { Product } from 'src/entities/Product';
import { ProductIngredient } from 'src/entities/ProductIngredient';

@Injectable()
export class ProductsModule {
    private readonly productDAO: DAO<Product>;
    private readonly productIngredientDAO: DAO<ProductIngredient>;

    constructor() {
        this.productDAO = new DAO<Product>(Product);
        this.productIngredientDAO = new DAO<ProductIngredient>(ProductIngredient);
    }

    getAll(): Promise<Product[]> {
        return this.productDAO.findAll(['productIngredients']);
    }

    create(product: Product): Promise<CreateResponse> {
        return this.productDAO.create(product);
    }

    update(product: Product): Promise<number> {
        return this.productDAO.update(product);
    }

    delete(id: number): Promise<number> {
        return this.productDAO.delete(id);
    }

    async addIngredientToProduct(
        productId: number,
        productIngredient: ProductIngredient
    ): Promise<Product> {
        const product = await this.productDAO.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        if (!product.productIngredients) {
            product.productIngredients = [];
        }

        product.productIngredients.push(productIngredient);

        await this.productIngredientDAO.create(productIngredient);
        await this.productDAO.update(product);

        return product;
    }
}
