import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Employee } from './Employee';

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

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date_ordered: Date;

    @Column({ type: 'timestamp' })
    date_aprox_recollect: Date;

    @Column({ type: 'enum', enum: PaymentMethod })
    payment_method: PaymentMethod;

    @Column({ type: 'boolean' })
    delivered: boolean;

    @OneToOne(() => Employee, { nullable: true })
    @JoinColumn()
    employee: Employee;

    @Column({ type: 'enum', enum: OrderState })
    state: OrderState;
}
