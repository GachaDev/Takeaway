import Image from 'next/image';
import logo from '../../../public/logo.webp';
import Link from 'next/link';
import { useFetch } from '@/components/utils/useFetch';
import { redirect } from 'next/navigation';

export default async function Register() {
    async function register(formData: FormData) {
        'use server';
        const result = await useFetch(
            '/users',
            'POST',
            JSON.stringify({
                email: formData.get('email'),
                first_name: formData.get('first_name'),
                last_name: formData.get('last_name'),
                phone: formData.get('phone'),
                password: formData.get('password')
            })
        );
        if (result.ok) {
            redirect('/login');
        }
    }

    return (
        <main className="flex flex-col heightDefault justify-center items-center w-full py-2">
            <Image
                alt="logo"
                className="2xl:w-[10rem] xl:w-[9rem] lg:w-[8rem] md:w-[7rem] sm:w-[6rem] w-[5rem]"
                width={200}
                height={200}
                src={logo}
            />
            <form
                className="flex flex-col 2xl:gap-6 xl:gap-4 gap-2 justify-center items-center w-full mt-3"
                action={register}
            >
                <div className="flex flex-col 2xl:w-2/6 xl:w-2/6 lg:w-2/6 md:w-3/6 sm:w-4/6 w-4/6 gap-1">
                    <div className="flex flex-col">
                        <label className="font-semibold" htmlFor="first_name">
                            Nombre
                        </label>
                        <input
                            id="first_name"
                            name="first_name"
                            required
                            minLength={2}
                            type="text"
                            className="focus:outline-none focus:border focus:border-neutral-400 border-neutral-200 border bg-neutral-100 rounded-lg p-2"
                            placeholder="Nombre"
                        />
                    </div>
                </div>
                <div className="flex flex-col 2xl:w-2/6 xl:w-2/6 lg:w-2/6 md:w-3/6 sm:w-4/6 w-4/6 gap-1">
                    <label className="font-semibold" htmlFor="lastname">
                        Apellidos
                    </label>
                    <input
                        id="last_name"
                        name="last_name"
                        type="text"
                        minLength={2}
                        required
                        className="focus:outline-none focus:border focus:border-neutral-400 border-neutral-200 border bg-neutral-100 rounded-lg p-2"
                        placeholder="Apellidos"
                    />
                </div>
                <div className="flex flex-col 2xl:w-2/6 xl:w-2/6 lg:w-2/6 md:w-3/6 sm:w-4/6 w-4/6 gap-1">
                    <label className="font-semibold" htmlFor="phone">
                        Nº de teléfono
                    </label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        minLength={9}
                        className="focus:outline-none focus:border focus:border-neutral-400 border-neutral-200 border bg-neutral-100 rounded-lg p-2"
                        placeholder="Teléfono"
                    />
                </div>
                <div className="flex flex-col 2xl:w-2/6 xl:w-2/6 lg:w-2/6 md:w-3/6 sm:w-4/6 w-4/6 gap-1">
                    <label className="font-semibold" htmlFor="email">
                        Correo
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="focus:outline-none focus:border focus:border-neutral-400 border-neutral-200 border bg-neutral-100 rounded-lg p-2"
                        placeholder="Correo"
                    />
                </div>
                <div className="flex flex-col 2xl:w-2/6 xl:w-2/6 lg:w-2/6 md:w-3/6 sm:w-4/6 w-4/6 gap-1">
                    <label className="font-semibold" htmlFor="password">
                        Contraseña
                    </label>
                    <input
                        id="password"
                        className="focus:outline-none focus:border focus:border-neutral-400 border-neutral-200 border bg-neutral-100 rounded-lg p-2"
                        name="password"
                        type="password"
                        required
                        minLength={8}
                        placeholder="Contraseña"
                    />
                </div>
                <button
                    className="bg-[--header] font-bold text-white p-2 rounded-xl 2xl:w-2/6 xl:w-2/6 lg:w-2/6 md:w-3/6 sm:w-4/6 w-4/6"
                    type="submit"
                >
                    CREAR CUENTA
                </button>
            </form>
            <Link
                href="/login"
                className="text-center text-[--header] underline underline-offset-1 mt-8"
            >
                ¿Tienes una cuenta? Inicia sesión
            </Link>
        </main>
    );
}
