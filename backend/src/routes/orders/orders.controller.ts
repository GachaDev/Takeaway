import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { OrdersModule } from './orders.module';
import { Order } from 'src/entities/Orders';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersModule) {}

    @Get()
    async findAll() {
        return await this.ordersService.getAll();
    }

    @Get('userOrders/:userId')
    async findUserOrders(@Param('userId') userId: number) {
        return await this.ordersService.findUserOrders(userId);
    }

    @Post()
    async create(@Body() order: Order) {
        return await this.ordersService.create(order);
    }

    @Put()
    async update(@Body() order: { order: Order }) {
        return await this.ordersService.update(order.order);
    }

    @Delete(':id')
    async delete(@Param('id') id: number, @Res() res: Response) {
        const response = await this.ordersService.delete(id);

        if (response === 1) {
            return res.status(200).json(response);
        } else if (response === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
    }
}
