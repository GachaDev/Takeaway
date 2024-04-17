import { Injectable } from '@nestjs/common';
import { DAO } from 'src/DAO/DAO';
import { Product } from 'src/entities/Product';

@Injectable()
export class ProductsModule {
    DAO: DAO<Product> = new DAO<Product>(Product);

    getAll(): Promise<Product[]> {
        return this.DAO.findAll(['productIngredients']);
    }

    create(product: Product): Promise<CreateResponse> {
        return this.DAO.create(product);
    }

    update(product: Product): Promise<number> {
        return this.DAO.update(product);
    }

    delete(id: number): Promise<number> {
        return this.DAO.delete(id);
    }
}
