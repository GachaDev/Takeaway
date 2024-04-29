import Image from 'next/image';
import logo from '../../../public/logo.webp';
import Link from 'next/link';

export default function Login() {
    async function signin(formData: FormData) {
        'use server';
        console.log(formData);
    }

    return (
        <main className="flex flex-col heightDefault justify-center items-center w-full">
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
                <div className="flex flex-col 2xl:w-2/6 xl:w-2/6 lg:w-2/6 md:w-3/6 sm:w-4/6 w-4/6 gap-5">
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
                <div className="flex flex-col 2xl:w-2/6 xl:w-2/6 lg:w-2/6 md:w-3/6 sm:w-4/6 w-4/6 gap-5">
                    <label className="font-semibold" htmlFor="password">
                        Contraseña
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
                    className="bg-[--header] font-bold text-white p-2 rounded-xl 2xl:w-2/6 xl:w-2/6 lg:w-2/6 md:w-3/6 sm:w-4/6 w-4/6"
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
        </main>
    );
}
