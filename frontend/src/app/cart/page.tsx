'use server';
import ProductsCarts from '@/components/cart/ProductsCarts/ProductsCarts';
import { handleAddToCart, handleRemoveFromCart } from '@/components/common/AddToCart';
import { useFetch } from '@/components/utils/useFetch';
import { cookies } from 'next/headers';

export default async function CartPage() {
    const Products = (await (
        await useFetch(`/products`, 'GET', '', ['products'])
    ).json()) as Product[];
    const cart = cookies().get('cart')?.value;
    let cartProducts = cart ? JSON.parse(cart) : [];

    return (
        <div className="flex justify-center w-full mt-5">
            <div className="flex flex-col items-center rounded-lg p-5 shadow-box w-5/6">
                <h1 className="text-center text-xl font-bold">Confirmar compra</h1>
                <div className="flex flex-row gap-10 mt-8 w-full justify-between max-md:flex-col max-md:items-center">
                    <div className="w-2/6 flex flex-col">
                        <h1 className="mb-5 text-lg font-semibold">Datos</h1>
                        {cookies().get('pickupOption')?.value === 'DOMICILIO' ? (
                            <div>
                                <div className="flex gap-2">
                                    <p className="font-bold">Tipo de recogida:</p>
                                    <span>{cookies().get('pickupOption')?.value}</span>
                                </div>
                                <input type="text" name="direccion" />
                                <div className="flex gap-2">
                                    <p className="font-bold">Fecha:</p>
                                    <span>{new Date().toLocaleDateString()}</span>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="flex gap-2">
                                    <p className="font-bold">Tipo de recogida:</p>
                                    <span>{cookies().get('pickupOption')?.value}</span>
                                </div>
                                <div className="flex gap-2">
                                    <p className="font-bold">Fecha:</p>
                                    <span>{new Date().toLocaleDateString()}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <ProductsCarts
                        cartProducts={cartProducts}
                        Products={Products}
                        addToCart={handleAddToCart}
                        removeFromCart={handleRemoveFromCart}
                    />
                </div>
            </div>
        </div>
    );
}
