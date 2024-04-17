import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from './Orders';
import { Product } from './Product';

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

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price_base: number;
}
