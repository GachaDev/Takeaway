import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Products {
    constructor(name: string) {
        this.name = name;
    }

    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column({ length: 30 })
    name: string;
}
