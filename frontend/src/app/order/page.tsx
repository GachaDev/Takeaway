import ModalOrder from '@/components/order/ModalOrder';
import '@mantine/core/styles.css';
import { cookies } from 'next/headers';
import { UseFetch } from '@/components/utils/UseFetch';
import Link from 'next/link';
import { handleAddToCart } from '@/components/common/AddToCart';
import AllProducts from '@/components/order/Products';

export default async function Order() {
    const Products = (await (
        await UseFetch(`/products`, 'GET', '', ['products'])
    ).json()) as Product[];
    const Categories = (await (
        await UseFetch(`/categories`, 'GET', '', ['categories'])
    ).json()) as Category[];

    const setTypeOrder = async (pickupOption: string, address: string) => {
        'use server';
        cookies().set('pickupOption', pickupOption, {
            expires: new Date().getTime() + 1000 * 60 * 60 * 24 * 365,
            sameSite: true,
            httpOnly: true,
            secure: true
        });
        cookies().set('pickupAddress', address, {
            expires: new Date().getTime() + 1000 * 60 * 60 * 24 * 365,
            sameSite: true,
            httpOnly: true,
            secure: true
        });
    };

    return (
        <>
            <main className="flex flex-col p-5">
                <div className="flex overflow-x-auto w-full gap-2 items-center">
                    <Link
                        href={'/order'}
                        className={`text-lg bg-[--header] text-white rounded-xl font-semibold px-4 py-2`}
                    >
                        <span className={'text-center'}>Todo</span>
                    </Link>
                    {Categories.map((value, index) => (
                        <Link
                            href={'/order/' + value.name}
                            key={index}
                            className={`text-lg rounded-xl font-semibold px-4 py-2`}
                        >
                            <span className={'text-center'}>{value.label}</span>
                        </Link>
                    ))}
                </div>
                <AllProducts products={Products} handleAddToCart={handleAddToCart} />
            </main>
            <ModalOrder pickup={cookies().get('pickupOption')?.value} setTypeOrder={setTypeOrder} />
        </>
    );
}
