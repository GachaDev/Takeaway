import { useFetch } from '@/components/utils/useFetch';
import AllVentas from '@/components/ventas/Ventas';
import { revalidateTag } from 'next/cache';

export default async function Ventas() {
    const orders = (await (await useFetch(`/orders`, 'GET', '', ['orders'])).json()) as Order[];

    const updateState = async (order: Order) => {
        'use server';

        await useFetch(`/orders`, 'PUT', JSON.stringify({ order: order }), ['orders']);
        revalidateTag('orders');
    };

    const cancelOrder = async (id: number) => {
        'use server';

        await useFetch(`/orders/${id}`, 'DELETE', '', ['orders']);
        revalidateTag('orders');
    };

    return (
        <main className="p-3 flex flex-col gap-2 items-center justify-center">
            <h1 className="text-3xl text-center">Pedidos Actuales</h1>
            <AllVentas allOrders={orders} updateState={updateState} cancelOrder={cancelOrder} />
        </main>
    );
}
