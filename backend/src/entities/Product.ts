import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductIngredient } from './ProductIngredient';
import { OrderProduct } from './OrderProduct';

@Entity('products')
export class Product {
    constructor(name: string, description: string, image: string) {
        this.name = name;
        this.description = description;
        this.image = image;
    }

    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column({ length: 30 })
    name: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    price_base: number;

    @OneToMany(() => ProductIngredient, productIngredient => productIngredient.product)
    productIngredients: ProductIngredient[];

    @OneToMany(() => OrderProduct, orderProduct => orderProduct.product)
    orderProducts: OrderProduct[];
}
