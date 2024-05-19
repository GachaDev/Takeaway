'use server';
import Cart from '@/components/cart/Cart';
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
                <Cart
                    Products={Products}
                    cartProducts={cartProducts}
                    handleAddToCart={handleAddToCart}
                    handleRemoveFromCart={handleRemoveFromCart}
                    pickupOption={cookies().get('pickupOption')?.value}
                    address={cookies().get('pickupAddress')?.value}
                />
            </div>
        </div>
    );
}
