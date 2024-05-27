import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderProduct } from './OrderProduct';

enum PaymentMethod {
    CASH = 'cash',
    CARD = 'card',
    PAYPAL = 'paypal',
    OTHER = 'other'
}

export enum OrderStateEnum {
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    IN_KITCHEN = 'in_kitchen',
    IN_DELIVERY = 'in_delivery',
    DELIVERED = 'delivered'
}

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: false })
    id_user: number;

    @Column({ type: 'boolean' })
    delivery: boolean;

    @Column({ type: 'varchar', length: 255 })
    address: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date_ordered: Date;

    @Column({ type: 'timestamp' })
    date_aprox_recollect: Date;

    @Column({ type: 'enum', enum: PaymentMethod })
    payment_method: PaymentMethod;

    @Column({ type: 'boolean' })
    delivered: boolean;

    @Column({ type: 'enum', enum: OrderStateEnum })
    state: OrderStateEnum;

    @OneToMany(() => OrderProduct, orderProduct => orderProduct.order, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    orderProducts: OrderProduct[];
}
