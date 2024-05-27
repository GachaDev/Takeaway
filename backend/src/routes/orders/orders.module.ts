import { Injectable } from '@nestjs/common';
import { DAO } from 'src/DAO/DAO';
import { OrderDAO } from 'src/DAO/OrderDAO';
import { OrderProduct } from 'src/entities/OrderProduct';
import { Order } from 'src/entities/Orders';
import { Product } from 'src/entities/Product';
import { ProductIngredient } from 'src/entities/ProductIngredient';
import { RemovedOrderIngredient } from 'src/entities/RemovedOrderIngredient';
import { User } from 'src/entities/User';

@Injectable()
export class OrdersModule {
    DAO: OrderDAO = new OrderDAO();
    orderProductDAO: DAO<OrderProduct> = new DAO<OrderProduct>(OrderProduct);
    removedOrderIngredientDAO: DAO<RemovedOrderIngredient> = new DAO<RemovedOrderIngredient>(
        RemovedOrderIngredient
    );
    productIngredientDAO: DAO<ProductIngredient> = new DAO<ProductIngredient>(ProductIngredient);
    userDAO: DAO<User> = new DAO<User>(User);
    productDAO: DAO<Product> = new DAO<Product>(Product);

    getAll(): Promise<Order[]> {
        return this.DAO.findAll([
            'orderProducts',
            'orderProducts.removedIngredients',
            'orderProducts.product',
            'orderProducts.removedIngredients.productIngredient',
            'orderProducts.removedIngredients.productIngredient.ingredient'
        ]);
    }

    async findUserOrders(userId: number): Promise<Order[] | null> {
        return this.DAO.findByUserId(userId, [
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
            let totalEuros = 0;
            for (const product of order.orderProducts) {
                const orderProduct = new OrderProduct();
                orderProduct.order = orderEntity;
                orderProduct.product = product.product;
                orderProduct.amount = product.amount;

                const productEntity = await this.productDAO.findById(product.product.id);
                totalEuros += productEntity.price * product.amount;
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
            const pointsEarned = Math.floor(totalEuros / 10);
            const user = await this.userDAO.findById(order.id_user);
            user.points += pointsEarned;
            await this.userDAO.update(user);
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
