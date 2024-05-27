import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderProduct } from './OrderProduct';

enum PaymentMethod {
    CASH = 'cash',
    CARD = 'card',
    PAYPAL = 'paypal',
    OTHER = 'other'
}

enum OrderState {
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELED = 'canceled'
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

    @Column({ type: 'enum', enum: OrderState })
    state: OrderState;

    @OneToMany(() => OrderProduct, orderProduct => orderProduct.order, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    orderProducts: OrderProduct[];
}
