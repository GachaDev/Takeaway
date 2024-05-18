import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex justify-center items-center flex-col text-center h-full">
            <h1 className="text-9xl font-extrabold text-yellow-900">404</h1>
            <span className="max-w-prose mx-auto mt-8">
                Es posible que la página que estás buscando haya sido eliminada, haya cambiado su
                nombre o no esté disponible temporalmente.
            </span>
            <div className="mt-8 bg-yellow-900 text-white p-3 rounded-xl font-bold">
                <Link href="/">Ir a la pagina de Inicio</Link>
            </div>
        </div>
    );
}
