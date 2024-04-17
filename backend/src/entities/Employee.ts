import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity('employees')
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    admin: boolean;

    @OneToOne(() => User, { nullable: false })
    @JoinColumn()
    user: User;
}
