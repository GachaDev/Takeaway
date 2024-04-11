import { Injectable } from '@nestjs/common';
import { DAO } from 'src/DAO/DAO';
import { Products } from 'src/entities/Products';

@Injectable()
export class ProductsModule {
    DAO: DAO<Products> = new DAO<Products>(Products);

    getAll(): Promise<Products[]> {
        return this.DAO.findAll();
    }

    create(product: Products): Promise<CreateResponse> {
        return this.DAO.create(product);
    }

    update(product: Products): Promise<number> {
        return this.DAO.update(product);
    }

    delete(id: number): Promise<number> {
        return this.DAO.delete(id);
    }
}
