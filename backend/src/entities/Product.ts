import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductIngredient } from './ProductIngredient';
import { OrderProduct } from './OrderProduct';
import { Category } from './Category';

@Entity('products')
export class Product {
    constructor(
        name: string,
        description: string,
        image: string,
        price: number,
        category: Category
    ) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
        this.category = category;
    }

    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column({ length: 30 })
    name: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column('float', { nullable: false, default: 0 })
    price: number;

    @ManyToOne(() => Category, category => category.products, { nullable: false })
    category: Category;

    @OneToMany(() => ProductIngredient, productIngredient => productIngredient.product, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    productIngredients: ProductIngredient[];

    @OneToMany(() => OrderProduct, orderProduct => orderProduct.product)
    orderProducts: OrderProduct[];
}
