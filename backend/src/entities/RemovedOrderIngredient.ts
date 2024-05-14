import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { OrderProduct } from './OrderProduct';
import { ProductIngredient } from './ProductIngredient';

@Entity('removed_order_ingredients')
export class RemovedOrderIngredient {
    @PrimaryGeneratedColumn('identity')
    id: number;

    @ManyToOne(() => OrderProduct, orderProduct => orderProduct.removedIngredients, {
        nullable: false
    })
    @JoinColumn({ name: 'order_product_id' })
    orderProduct: OrderProduct;

    @ManyToOne(
        () => ProductIngredient,
        productIngredient => productIngredient.removedOrderIngredients,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'product_ingredient_id' })
    productIngredient: ProductIngredient;
}
