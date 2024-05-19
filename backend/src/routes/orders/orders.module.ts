import { Injectable } from '@nestjs/common';
import { DAO } from 'src/DAO/DAO';
import { Order } from 'src/entities/Orders';

@Injectable()
export class OrdersModule {
    DAO: DAO<Order> = new DAO<Order>(Order);

    getAll(): Promise<Order[]> {
        return this.DAO.findAll();
    }

    create(order: Order): Promise<CreateResponse> {
        return this.DAO.create(order);
    }

    update(order: Order): Promise<number> {
        return this.DAO.update(order);
    }

    delete(id: number): Promise<number> {
        return this.DAO.delete(id);
    }
}
