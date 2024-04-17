import { Injectable } from '@nestjs/common';
import { DAO } from 'src/DAO/DAO';
import { Ingredient } from 'src/entities/Ingredient';

@Injectable()
export class IngredientsModule {
    DAO: DAO<Ingredient> = new DAO<Ingredient>(Ingredient);

    getAll(): Promise<Ingredient[]> {
        return this.DAO.findAll();
    }

    create(ingredient: Ingredient): Promise<CreateResponse> {
        return this.DAO.create(ingredient);
    }

    update(ingredient: Ingredient): Promise<number> {
        return this.DAO.update(ingredient);
    }

    delete(id: number): Promise<number> {
        return this.DAO.delete(id);
    }
}
