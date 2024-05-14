import Image from 'next/image';
import logo from '../../../public/logo.webp';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { useFetch } from '@/components/utils/useFetch';
import { redirect } from 'next/navigation';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

export default function Login() {
    async function signin(formData: FormData) {
        'use server';
        const auth = await useFetch(
            '/users/login',
            'POST',
            JSON.stringify({ email: formData.get('email'), password: formData.get('password') })
        );
        if (auth.status === 200) {
            const { token } = await auth.json();
            cookies().set('token', token, {
                expires: new Date().getTime() + 1000 * 60 * 60 * 24 * 7,
                sameSite: true,
                httpOnly: true,
                secure: true
            });
            redirect('/order');
        }
    }

    return (
        <main className="flex flex-col justify-center items-center w-full">
            <Image
                alt="logo"
                className="2xl:w-[12rem] xl:w-[11rem] lg:w-[10rem] md:w-[9rem] sm:w-[8rem] w-[7rem]"
                width={200}
                height={200}
                src={logo}
            />
            <form
                className="flex flex-col gap-6 justify-center items-center w-full mt-3"
                action={signin}
            >
                <Input
                    id="email"
                    label="Correo"
                    placeholder="Correo"
                    type="email"
                    widthAssign
                    required
                />
                <Input
                    id="password"
                    label="Contraseña"
                    placeholder="Contraseña"
                    type="password"
                    minLength={8}
                    widthAssign
                    required
                />
                <Button style="greenLigth" text="Iniciar sesión" widthAssign />
            </form>
            <Link
                href="/register"
                className="text-center text-[--header] underline underline-offset-1 mt-8"
            >
                ¿No tienes una cuenta? Registrate
            </Link>
        </main>
    );
}
