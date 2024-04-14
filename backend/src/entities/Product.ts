import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
    constructor(name: string, description: string, image: string) {
        this.name = name;
        this.description = description;
        this.image = image;
    }

    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column({ length: 30 })
    name: string;

    @Column()
    description: string;

    @Column()
    image: string;
}
