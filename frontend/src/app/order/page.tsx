import ModalOrder from '@/components/order/ModalOrder';
import '@mantine/core/styles.css';
import { cookies } from 'next/headers';

export default function Order() {
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
                <div>Tienda</div>
            </main>
            <ModalOrder pickup={cookies().get('pickupOption')?.value} setTypeOrder={setTypeOrder} />
        </>
    );
}
