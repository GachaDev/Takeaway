import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Product } from './Product';

@Entity('ingredients')
export class Ingredient {
    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column({ length: 30 })
    name: string;

    @ManyToMany(() => Product, product => product.productIngredients)
    products: Product[];
}
