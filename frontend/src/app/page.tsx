import Image from 'next/image';
import image1 from '../../public/carousel/image3.webp';
import jamon from '../../public/jamon.webp';
import croquetas from '../../public/croquetas.webp';
import campero from '../../public/campero.webp';
import bravas from '../../public/bravas.webp';
import alitas from '../../public/alitas.webp';
import Product from '@/components/common/Product';
import Link from 'next/link';

export default function Home() {
    const favProducts = [
        {
            name: 'Bocadillo de Jamón',
            image: jamon,
            price: 5.99
        },
        {
            name: 'Campero Malagueño',
            image: campero,
            price: 10.99
        },
        {
            name: 'Croquetas de Jamón',
            image: croquetas,
            price: 9.99
        },
        {
            name: 'Patatas bravas',
            image: bravas,
            price: 6.99
        },
        {
            name: 'Alitas de Pollo',
            image: alitas,
            price: 5.99
        }
    ] as Product[];
    return (
        <main>
            <div className="flex justify-center items-center flex-col bg-[--cartel] p-8 gap-5">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-white font-bold text-md 2xl:text-4xl xl:text-3xl lg:text-2xl">
                        PRUEBA NUESTRO NUEVO
                    </h2>
                    <h2 className="text-[#f9deb4] font-bold text-2xl 2xl:text-6xl xl:text-6xl lg:text-5xl md:text-4xl sm:3xl max-sm:text-center">
                        BOCADILLO DE TERNERA
                    </h2>
                </div>
                <div className="flex justify-center">
                    <Image src={image1} alt="Imagen de sandwich de Pollo" className="w-1/2" />
                </div>
                <span className="text-center text-neutral-300 text-[10px]">
                    Campaña disponible solo hasta el 1 de Julio de 2024
                </span>
                <div className="bg-[#f4dfbf] p-3 rounded-xl text-yellow-900 flex justify-center w-max font-bold">
                    <Link href="/order">EMPEZAR PEDIDO</Link>
                </div>
            </div>
            <section className="flex flex-col justify-center items-center mt-6 p-5">
                <h2 className="font-semibold text-[--header] text-4xl text-center max-sm:text-xl py-3 px-16 border-b border-yellow-900">
                    Productos destacados
                </h2>
                <div className="grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5 w-full py-6 items-center justify-center px-2 mt-6">
                    {favProducts.map((value, index) => (
                        <Product
                            key={index}
                            id={index}
                            name={value.name}
                            price={value.price}
                            image={value.image}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}
