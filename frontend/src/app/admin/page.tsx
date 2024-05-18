import Link from 'next/link';

export default function Admin() {
    return (
        <main className="p-3 flex flex-col gap-2 items-center justify-center">
            <h1 className="mb-4 font-semibold text-xl text-center text-[--header]">
                Bienvenido al Panel de Administrador
            </h1>
            <Link
                className="bg-[--cartel] p-3 w-2/6 max-sm:w-5/6 max-md:4/6 max-lg:3/6 text-center font-bold rounded-xl text-white"
                href={'/admin/ventas'}
            >
                Gestionar Ventas
            </Link>
            <Link
                className="bg-[--cartel] p-3 w-2/6 max-sm:w-5/6 max-md:4/6 max-lg:3/6 text-center font-bold rounded-xl text-white"
                href={'/admin/productos'}
            >
                Gestionar Productos
            </Link>
        </main>
    );
}
