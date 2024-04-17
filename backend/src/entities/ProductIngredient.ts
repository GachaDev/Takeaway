import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Product } from './Product';
import { Ingredient } from './Ingredient';

@Entity('products_ingredients')
export class ProductIngredient {
    @PrimaryGeneratedColumn('identity')
    id: number;

    @ManyToOne(() => Product, product => product.productIngredients, { nullable: false })
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @ManyToOne(() => Ingredient, ingredient => ingredient.products, { nullable: false })
    @JoinColumn({ name: 'ingredient_id' })
    ingredient: Ingredient;

    @Column()
    can_remove: boolean;
}
