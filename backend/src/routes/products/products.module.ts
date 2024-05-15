import { Injectable } from '@nestjs/common';
import { DAO } from 'src/DAO/DAO';
import { Ingredient } from 'src/entities/Ingredient';
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
        return this.productDAO.findAll(['productIngredients', 'productIngredients.ingredient']);
    }

    async create(product: Product & { ingredientsToAdd: Ingredient[] }): Promise<CreateResponse> {
        try {
            const createdProductResponse = await this.productDAO.create(product);

            if (createdProductResponse.lastInsertId) {
                const createdProductId = createdProductResponse.lastInsertId;

                if (product.ingredientsToAdd && product.ingredientsToAdd.length > 0) {
                    for (const ingredient of product.ingredientsToAdd) {
                        if (typeof createdProductId === 'number') {
                            const productIngredient = new ProductIngredient();
                            productIngredient.product = product;
                            productIngredient.ingredient = ingredient;
                            productIngredient.can_remove = true;
                            await this.productIngredientDAO.create(productIngredient);
                        }
                    }
                }
            }

            return createdProductResponse;
        } catch (error) {
            return { lastInsertId: 0, affectedRows: 0 };
        }
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
