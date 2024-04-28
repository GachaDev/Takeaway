import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Exclude } from '@nestjs/class-transformer';

@Entity('users')
export class User {
    constructor(email: string, first_name: string, last_name: string, phone: string) {
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone = phone;
    }

    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column({ length: 30, unique: true })
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column({ length: 30 })
    first_name: string;

    @Column({ length: 30 })
    last_name: string;

    @Column({ length: 15 })
    phone: string;

    @Column({ default: 0 })
    points: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ default: false })
    employee: boolean;
}
