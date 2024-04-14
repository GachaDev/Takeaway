import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from '@nestjs/class-transformer';

@Entity('users')
export class User {
    constructor(
        email: string,
        first_name: string,
        last_name: string,
        phone: string,
        first_login: boolean,
        points: number
    ) {
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone = phone;
        this.first_login = first_login;
        this.points = points;
    }

    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column({ length: 30 })
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

    @Column()
    first_login: boolean;

    @Column()
    points: number;
}
