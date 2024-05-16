import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Product } from './Product';

@Entity('categories')
@Unique(['name'])
export class Category {
    constructor(name: string, label: string) {
        this.name = name;
        this.label = label;
    }

    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column({ length: 30, unique: true })
    name: string;

    @Column()
    label: string;

    @OneToMany(() => Product, product => product.category)
    products: Product[];
}
