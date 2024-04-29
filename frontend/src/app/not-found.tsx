import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex heightDefault justify-center items-center flex-col text-center">
            <h1 className="text-9xl font-extrabold text-yellow-400">404</h1>
            <h2 className="font-bold">404 - Not found!</h2>
            <span className="max-w-prose mx-auto">
                Es posible que la página que estás buscando haya sido eliminada, haya cambiado su
                nombre o no esté disponible temporalmente.
            </span>
            <div className="mt-8 bg-[#53924c] text-white p-3 rounded-xl font-bold">
                <Link href="/">Ir a la pagina de Inicio</Link>
            </div>
        </div>
    );
}
