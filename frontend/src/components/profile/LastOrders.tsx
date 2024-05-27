export default function LastOrders({ orders }: { orders: Order[] }) {
    console.log(orders);
    return (
        <div className="flex flex-col justify-between gap-4 p-6 shadow-box">
            <h1 className="text-xl font-semibold text-center">Mis ultimos pedidos</h1>
            <div className="flex flex-col shadow-sm gap-4">
                {orders.map((order: Order) => (
                    <div
                        key={order.id}
                        className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-box"
                    >
                        <div className="flex justify-between">
                            <div className="text-lg font-semibold">
                                Pedido # {order.id} -{' '}
                                {new Date(order.date_ordered).toLocaleString()}
                            </div>
                        </div>
                        <div>
                            <span className="font-semibold">Productos</span>
                            <div className="flex flex-col gap-2 mt-2">
                                {order.orderProducts.map((orderProduct: OrderProduct) => (
                                    <div
                                        key={orderProduct.id}
                                        className="flex justify-between gap-2"
                                    >
                                        <div className="text-sm">{orderProduct.product.name}</div>
                                        <div className="text-sm">{orderProduct.amount}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
