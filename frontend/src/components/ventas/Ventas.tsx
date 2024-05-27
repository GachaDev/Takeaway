'use client';
import { useEffect, useState } from 'react';
import { useFetch } from '../utils/useFetch';
import { Select } from '@mantine/core';
export default function AllVentas({
    allOrders,
    updateState,
    cancelOrder
}: {
    allOrders: Order[];
    updateState: (order: Order) => void;
    cancelOrder: (id: number) => void;
}) {
    const [orders, setOrders] = useState<Order[]>(allOrders);

    const fetchOrders = async () => {
        const response = await useFetch(`/orders`, 'GET', '', ['orders']);
        const ordersData = await response.json();
        const filteredOrders = ordersData.filter((order: Order) => order.state !== 'delivered');
        setOrders(filteredOrders);
    };

    const getLabelState = (state: OrderState) => {
        switch (state) {
            case 'in_kitchen':
                return 'En cocina';
            case 'in_delivery':
                return 'En entrega';
            case 'completed':
                return 'Completado';
            case 'in_progress':
                return 'En proceso';
            case 'pending':
                return 'Pendiente';
            case 'delivered':
                return 'Entregado';
        }
    };

    const getPaymentMethod = (payment_method: PaymentMethod) => {
        switch (payment_method) {
            case 'cash':
                return 'Efectivo';
            case 'card':
                return 'Tarjeta de Débito';
            case 'paypal':
                return 'Paypal';
            case 'other':
                return 'Otro';
        }
    };

    const handleChange = (value: OrderState, order: Order) => {
        const updatedOrders = orders.map((o: Order) => {
            if (o.id === order.id) {
                return { ...o, state: value };
            } else {
                return o;
            }
        });
        let newOrder = { ...order };
        newOrder.state = value;
        updateState(newOrder);
        setOrders(updatedOrders);
    };

    const handleClickDelete = (id: number) => {
        setOrders(orders.filter((order: Order) => order.id !== id));
        cancelOrder(id);
    };

    useEffect(() => {
        const interval = setInterval(fetchOrders, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-wrap gap-10 mt-8">
            {orders.length === 0 && (
                <div className="flex flex-col justify-center items-center">
                    <p className="text-lg">No hay pedidos actuales</p>
                </div>
            )}
            {orders.map((order: Order) => (
                <div
                    className="flex flex-col justify-between gap-2 p-6 rounded-lg bg-white shadow-box"
                    key={order.id}
                >
                    <div className="flex flex-col gap-1">
                        <h2 className="text-2xl">
                            Pedido #{order.id} - {order.delivery ? 'Domicilio' : 'Recoger'}
                        </h2>
                        {order.delivery ? (
                            <p className="text-lg">Calle: {order.address}</p>
                        ) : (
                            <p>Calle: n/a</p>
                        )}
                        <p className="text-lg">
                            Hora de entrada:{' '}
                            {new Date(order.date_ordered).getHours() +
                                ':' +
                                new Date(order.date_ordered).getMinutes()}
                        </p>
                        <p className="text-lg">
                            Hora limite:{' '}
                            {new Date(order.date_aprox_recollect).getHours() +
                                ':' +
                                new Date(order.date_aprox_recollect).getMinutes()}
                        </p>
                        <p className="text-lg">
                            Metodo de pago: {getPaymentMethod(order.payment_method)}
                        </p>
                        <div className="text-lg">
                            <span>Estado: </span>
                            <Select
                                value={order.state}
                                onChange={value => handleChange(value as OrderState, order)}
                                data={[
                                    { label: getLabelState('in_kitchen'), value: 'in_kitchen' },
                                    { label: getLabelState('in_delivery'), value: 'in_delivery' },
                                    { label: getLabelState('completed'), value: 'completed' },
                                    { label: getLabelState('in_progress'), value: 'in_progress' },
                                    { label: getLabelState('pending'), value: 'pending' },
                                    { label: getLabelState('delivered'), value: 'delivered' }
                                ]}
                            />
                        </div>
                        <div>
                            <span>Productos: </span>
                            <div className="flex flex-wrap gap-2">
                                {order.orderProducts.map((orderProduct: OrderProduct) => (
                                    <div className="flex flex-col gap-2">
                                        <p className="text-lg">
                                            {orderProduct.product.name} - {orderProduct.amount} ud
                                        </p>
                                        {orderProduct.removedIngredients.length > 0 && (
                                            <div className="flex flex-col gap-2">
                                                <span>Ingredientes eliminados: </span>
                                                <div className="flex flex-wrap gap-2">
                                                    {orderProduct.removedIngredients.map(
                                                        (removedIngredient: RemovedIngredient) => (
                                                            <div className="flex flex-col gap-2">
                                                                <p className="text-sm">
                                                                    {
                                                                        removedIngredient
                                                                            .productIngredient
                                                                            .ingredient.name
                                                                    }
                                                                </p>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <button
                            onClick={() => handleClickDelete(order.id)}
                            className={`bg-[--cartel] text-white py-3 px-10 rounded-xl font-bold capitalize w-full`}
                        >
                            <span>Cancelar pedido</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
