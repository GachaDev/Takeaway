import Button from '@/components/common/Button';
import ChangePassword from '@/components/profile/ChangePassword';
import LastOrders from '@/components/profile/LastOrders';
import MyPoints from '@/components/profile/MyPoints';
import PersonalInfo from '@/components/profile/PersonalInfo';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Profile() {
    async function logOut() {
        'use server';
        cookies().delete('token');
        redirect('/login');
    }

    return (
        <main className="p-5 w-full">
            <div className="py-5">
                <h1 className="text-3xl text-center">Mi cuenta</h1>
                <div className="grid sm:grid-cols-2 gap-10 justify-center mt-8">
                    <PersonalInfo />
                    <ChangePassword />
                    <LastOrders />
                    <MyPoints />
                </div>
                <div className="flex max-sm:flex-col justify-center gap-2 mt-16 w-full">
                    <Button handleClick={logOut} style="yellow" text="Cerrar sesión" />
                </div>
            </div>
        </main>
    );
}
