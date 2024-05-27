import { Order } from 'src/entities/Orders';
import { DAO } from './DAO';

export class OrderDAO extends DAO<Order> {
    constructor() {
        super(Order);
    }

    async findByUserId(id_user: number, relations?: string[]): Promise<Order[]> {
        if (!id_user) return [];

        return this.repository.find({
            where: { id_user },
            relations: relations || []
        });
    }
}
