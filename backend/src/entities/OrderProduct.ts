import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Order } from './Orders';
import { Product } from './Product';
import { RemovedOrderIngredient } from './RemovedOrderIngredient';

@Entity('order_products')
export class OrderProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, order => order.orderProducts)
    order: Order;

    @ManyToOne(() => Product, product => product.orderProducts)
    product: Product;

    @Column({ type: 'int' })
    amount: number;

    @OneToMany(() => RemovedOrderIngredient, removedIngredient => removedIngredient.orderProduct)
    removedIngredients: RemovedOrderIngredient[];
}
