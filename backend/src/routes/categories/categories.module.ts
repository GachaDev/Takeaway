import { Injectable } from '@nestjs/common';
import { DAO } from 'src/DAO/DAO';
import { Category } from 'src/entities/Category';

@Injectable()
export class CategoriesModule {
    DAO: DAO<Category> = new DAO<Category>(Category);

    getAll(): Promise<Category[]> {
        return this.DAO.findAll();
    }

    create(category: Category): Promise<CreateResponse> {
        return this.DAO.create(category);
    }

    update(category: Category): Promise<number> {
        return this.DAO.update(category);
    }

    delete(id: number): Promise<number> {
        return this.DAO.delete(id);
    }
}
