import Link from 'next/link';

export default function Admin() {
    return (
        <main className="p-3 flex flex-col gap-2 items-center justify-center">
            <h1 className="mb-4 font-semibold text-xl">Bienvenido al Panel de Administrador</h1>
            <Link
                className="bg-yellow-500 p-3 w-2/6 text-center font-bold rounded-full"
                href={'/admin/ventas'}
            >
                Gestionar Ventas
            </Link>
            <Link
                className="bg-yellow-500 p-3 w-2/6 text-center font-bold rounded-full"
                href={'/admin/productos'}
            >
                Gestionar Productos
            </Link>
        </main>
    );
}
