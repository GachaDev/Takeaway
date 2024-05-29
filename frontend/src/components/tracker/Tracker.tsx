'use client';

import { useEffect, useState } from 'react';
import { UseFetch } from '../utils/UseFetch';
import { getLabelState } from '../ventas/Ventas';

export default function Tracker({ userId }: { userId: number }) {
    const [order, setOrder] = useState<Order>();

    useEffect(() => {
        const getOrders = async () => {
            const orders =
                (await (await UseFetch(`/orders/userOrders/${userId}`, 'GET')).json()) || [];
            if (orders.length >= 1) {
                const undeliveredOrder = orders?.find(
                    (order: Order) => order.state !== 'delivered'
                );
                if (undeliveredOrder) {
                    setOrder(undeliveredOrder);
                } else {
                    setOrder(undefined);
                }
            }
        };

        const interval = setInterval(getOrders, 5000);

        getOrders();

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center">
            {order ? (
                <div className="flex flex-col items-center">
                    <h2 className="font-semibold bg-[--cartel] rounded-md px-8 text-white py-3 text-lg mt-5">
                        {order ? getLabelState(order.state) : 'No order'}
                    </h2>
                    <div className="spinner mt-5"></div>
                </div>
            ) : (
                <div className="text-center">
                    <h2 className="font-semibold bg-[--cartel] rounded-md px-8 text-white py-3 text-lg mt-5">
                        No tienes ningun pedido pendiente
                    </h2>
                </div>
            )}
        </div>
    );
}
