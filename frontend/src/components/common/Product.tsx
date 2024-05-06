import Image from 'next/image';

export default function Product({
    name,
    price,
    image,
    add = false,
    modify = false
}: Product & { add?: boolean; modify?: boolean }) {
    return (
        <div className="flex flex-col items-center justify-between gap-3 h-full shadow-box p-5 rounded-lg">
            <Image
                className="max-h-[200px] h-full object-cover p-2"
                alt={name}
                src={image}
                width={350}
                height={350}
            />
            <div className="flex justify-between items-center w-full">
                <h2 className="text-sm 2xl:text-xl xl:text-lg lg:text-md font-medium w-full">
                    {name}
                </h2>
                <span className="text-sm 2xl:text-xl xl:text-lg lg:text-md font-medium">
                    {price}€
                </span>
            </div>
            <div className="flex justify-center gap-2 px-2 w-full">
                {modify && (
                    <button
                        className={`bg-white border border-black w-full py-3 rounded-xl font-bold capitalize flex justify-center`}
                    >
                        <span>Ver</span>
                    </button>
                )}
                {add && (
                    <button
                        className={`bg-[--cartel] w-full text-white py-3 rounded-xl font-bold capitalize flex justify-center`}
                    >
                        <span>Añadir</span>
                    </button>
                )}
            </div>
        </div>
    );
}
