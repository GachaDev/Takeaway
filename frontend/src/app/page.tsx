import Image from 'next/image';
import image1 from '../../public/carousel/image3.webp';

export default function Home() {
    return (
        <main>
            <div className="flex justify-center flex-col bg-[--cartel] p-8 gap-5">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-white font-bold text-md 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl sm:lg">
                        PRUEBA NUESTRO NUEVO
                    </h2>
                    <h2 className="text-yellow-400 font-bold text-2xl 2xl:text-6xl xl:text-6xl lg:text-5xl md:text-4xl sm:3xl">
                        BOCADILLO DE TERNERA
                    </h2>
                </div>
                <div className="flex justify-center">
                    <Image src={image1} alt="Imagen de sandwich de Pollo" className="w-1/2" />
                </div>
                <span className="text-center text-neutral-300 text-[10px]">
                    Campaña disponible solo hasta el 1 de Julio de 2024
                </span>
            </div>
            <div className="flex justify-center items-center mt-4">
                <h2 className="font-bold text-md 2xl:text-4xl xl:text-3xl lg:text-2xl py-3 px-16 md:text-xl sm:lg border-b border-yellow-400">
                    Productos destacados
                </h2>
            </div>
        </main>
    );
}
