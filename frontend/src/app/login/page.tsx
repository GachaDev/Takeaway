import Image from 'next/image';
import logo from '../../../public/logo.webp';
import Link from 'next/link';

export default function Login() {
    async function signin(formData: FormData) {
        'use server';
        console.log('login');
    }

    return (
        <main className="flex h-full justify-center p-10">
            <div className="w-full flex justify-center items-center">
                <Image alt="logo" width={500} height={500} src={logo} />
            </div>
            <div className="flex flex-col h-full justify-center w-full">
                <form className="flex flex-col gap-10 justify-center" action={signin}>
                    <h1 className="text-xl font-bold text-center">Bienvenido a MDK Burguer</h1>
                    <div className="flex flex-col w-full gap-5">
                        <label className="font-semibold" htmlFor="email">
                            Correo
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="focus:outline-none focus:border focus:border-neutral-400 border-neutral-200 border bg-neutral-100 rounded-lg p-2"
                            placeholder="Correo"
                        />
                    </div>
                    <div className="flex flex-col gap-5">
                        <label className="font-semibold" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            className="focus:outline-none focus:border focus:border-neutral-400 border-neutral-200 border bg-neutral-100 rounded-lg p-2"
                            name="password"
                            type="password"
                            placeholder="Contraseña"
                        />
                    </div>
                    <button
                        className="bg-[--header] font-bold text-white p-2 rounded-xl"
                        type="submit"
                    >
                        INICIAR SESIÓN
                    </button>
                </form>
                <Link
                    href="/register"
                    className="text-center text-[--header] underline underline-offset-1 mt-8"
                >
                    ¿No tienes una cuenta? Registrate
                </Link>
            </div>
        </main>
    );
}
