import { Injectable } from '@nestjs/common';
import { DAO } from 'src/DAO/DAO';
import { OrderProduct } from 'src/entities/OrderProduct';
import { Order } from 'src/entities/Orders';
import { ProductIngredient } from 'src/entities/ProductIngredient';
import { RemovedOrderIngredient } from 'src/entities/RemovedOrderIngredient';

@Injectable()
export class OrdersModule {
    DAO: DAO<Order> = new DAO<Order>(Order);
    orderProductDAO: DAO<OrderProduct> = new DAO<OrderProduct>(OrderProduct);
    removedOrderIngredientDAO: DAO<RemovedOrderIngredient> = new DAO<RemovedOrderIngredient>(
        RemovedOrderIngredient
    );
    productIngredientDAO: DAO<ProductIngredient> = new DAO<ProductIngredient>(ProductIngredient);

    getAll(): Promise<Order[]> {
        return this.DAO.findAll([
            'orderProducts',
            'orderProducts.removedIngredients',
            'orderProducts.product',
            'orderProducts.removedIngredients.productIngredient',
            'orderProducts.removedIngredients.productIngredient.ingredient'
        ]);
    }

    async create(order: Order): Promise<CreateResponse> {
        let order2 = { ...order };
        order2.orderProducts = [];
        const createdOrder = await this.DAO.create(order2);
        if (createdOrder.lastInsertId) {
            const orderEntity = await this.DAO.findById(createdOrder.lastInsertId);

            for (const product of order.orderProducts) {
                const orderProduct = new OrderProduct();
                orderProduct.order = orderEntity;
                orderProduct.product = product.product;
                orderProduct.amount = product.amount;

                const createdOrderProduct = await this.orderProductDAO.create(orderProduct);
                if (createdOrderProduct.lastInsertId) {
                    const orderProductEntity = await this.orderProductDAO.findById(
                        createdOrderProduct.lastInsertId
                    );
                    for (const removedIngredient of product.removedIngredients) {
                        const removedOrderIngredient = new RemovedOrderIngredient();
                        removedOrderIngredient.orderProduct = orderProductEntity;
                        removedOrderIngredient.productIngredient =
                            await this.productIngredientDAO.findById(
                                removedIngredient.productIngredient.id
                            );

                        await this.removedOrderIngredientDAO.create(removedOrderIngredient);
                    }
                }
            }
        }
        return createdOrder;
    }

    update(order: Order): Promise<number> {
        return this.DAO.update(order);
    }

    delete(id: number): Promise<number> {
        return this.DAO.delete(id);
    }
}
