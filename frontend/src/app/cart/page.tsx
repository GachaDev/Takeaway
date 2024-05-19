'use server';
import Cart from '@/components/cart/Cart';
import { handleAddToCart, handleRemoveFromCart } from '@/components/common/AddToCart';
import { useFetch } from '@/components/utils/useFetch';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function CartPage() {
    const Products = (await (
        await useFetch(`/products`, 'GET', '', ['products'])
    ).json()) as Product[];
    const Ingredients = (await (
        await useFetch(`/ingredients`, 'GET', '', ['ingredients'])
    ).json()) as Ingredient[];
    const cart = cookies().get('cart')?.value;
    let cartProducts = cart ? JSON.parse(cart) : [];

    const finishOrder = async (selectedDate: string, paymentMethod: string) => {
        'use server';

        cookies().set('pickupOption', '', {
            expires: new Date(0),
            path: '/',
            sameSite: true,
            httpOnly: true,
            secure: true
        });
        cookies().set('pickupAddress', '', {
            expires: new Date(0),
            path: '/',
            sameSite: true,
            httpOnly: true,
            secure: true
        });
        cookies().set('cart', '', {
            expires: new Date(0),
            path: '/',
            sameSite: true,
            httpOnly: true,
            secure: true
        });
        redirect('/tracker');
    };

    return (
        <div className="flex justify-center w-full mt-5">
            <div className="flex flex-col items-center rounded-lg p-5 shadow-box w-5/6">
                <h1 className="text-center text-xl font-bold">Confirmar compra</h1>
                <Cart
                    Products={Products}
                    Ingredients={Ingredients}
                    cartProducts={cartProducts}
                    handleAddToCart={handleAddToCart}
                    handleRemoveFromCart={handleRemoveFromCart}
                    pickupOption={cookies().get('pickupOption')?.value}
                    address={cookies().get('pickupAddress')?.value}
                    finishOrder={finishOrder}
                />
            </div>
        </div>
    );
}
