import ModalOrder from '@/components/order/ModalOrder';
import '@mantine/core/styles.css';
import { cookies } from 'next/headers';

import Product from '@/components/common/Product';
import { useFetch } from '@/components/utils/useFetch';
import Link from 'next/link';

export default async function Order({ params }: { params: { category: string } }) {
    const Products = (await (await useFetch(`/products`, 'GET')).json()) as Product[];
    const Categories = (await (await useFetch(`/categories`, 'GET')).json()) as Category[];

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

    const filteredProducts = params.category
        ? Products.filter(product => product.category?.name === params.category)
        : Products;

    return (
        <>
            <main className="flex flex-col p-5">
                <div className="flex overflow-x-auto w-full gap-2 items-center">
                    <Link
                        href={'/order'}
                        className={`text-xl rounded-full font-semibold px-4 py-2`}
                    >
                        <span className={'text-center'}>Todo</span>
                    </Link>
                    {Categories.map((value, index) => (
                        <Link
                            href={'/order/' + value.name}
                            key={index}
                            className={`text-xl ${
                                params.category === value.name && 'bg-[--cartel] text-white'
                            } rounded-xl font-semibold px-4 py-2`}
                        >
                            <span className={'text-center'}>{value.label}</span>
                        </Link>
                    ))}
                </div>
                <div className="grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5 w-full py-6 items-center justify-center px-2 mt-6">
                    {filteredProducts.map((value, index) => (
                        <Product
                            key={index}
                            id={value.id}
                            name={value.name}
                            price={value.price}
                            image={value.image}
                            add
                            modify
                        />
                    ))}
                </div>
            </main>
            <ModalOrder pickup={cookies().get('pickupOption')?.value} setTypeOrder={setTypeOrder} />
        </>
    );
}
