import ModalOrder from '@/components/order/ModalOrder';
import '@mantine/core/styles.css';
import { cookies } from 'next/headers';
import jamon from '../../../../public/jamon.webp';
import croquetas from '../../../../public/croquetas.webp';
import campero from '../../../../public/campero.webp';
import bravas from '../../../../public/bravas.webp';
import alitas from '../../../../public/alitas.webp';
import Product from '@/components/common/Product';

export default function Order() {
    const favProducts = [
        {
            name: 'Bocadillo de Jamón',
            image: jamon,
            price: 5.99
        },
        {
            name: 'Campero Malagueño',
            image: campero,
            price: 10.99
        },
        {
            name: 'Croquetas de Jamón',
            image: croquetas,
            price: 9.99
        },
        {
            name: 'Patatas bravas',
            image: bravas,
            price: 6.99
        },
        {
            name: 'Alitas de Pollo',
            image: alitas,
            price: 5.99
        },
        {
            name: 'Alitas de Pollo',
            image: alitas,
            price: 5.99
        },
        {
            name: 'Alitas de Pollo',
            image: alitas,
            price: 5.99
        },
        {
            name: 'Alitas de Pollo',
            image: alitas,
            price: 5.99
        },
        {
            name: 'Alitas de Pollo',
            image: alitas,
            price: 5.99
        },
        {
            name: 'Alitas de Pollo',
            image: alitas,
            price: 5.99
        },
        {
            name: 'Alitas de Pollo',
            image: alitas,
            price: 5.99
        },
        {
            name: 'Alitas de Pollo',
            image: alitas,
            price: 5.99
        },
        {
            name: 'Alitas de Pollo',
            image: alitas,
            price: 5.99
        },
        {
            name: 'Alitas de Pollo',
            image: alitas,
            price: 5.99
        },
        {
            name: 'Alitas de Pollo',
            image: alitas,
            price: 5.99
        },
        {
            name: 'Alitas de Pollo',
            image: alitas,
            price: 5.99
        },
        {
            name: 'Alitas de Pollo',
            image: alitas,
            price: 5.99
        },
        {
            name: 'Alitas de Pollo',
            image: alitas,
            price: 5.99
        }
    ] as Product[];

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
            <main className="flex p-5">
                <div className="grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5 w-full py-6 items-center justify-center px-2 mt-6">
                    {favProducts.map((value, index) => (
                        <Product
                            key={index}
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
