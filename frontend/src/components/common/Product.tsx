import Image from 'next/image';

export default function Product({
    name,
    price,
    id,
    image,
    add = false,
    modify = false,
    del = false,
    edit = false,
    onAdd,
    onModify,
    onDelete,
    onEdit
}: Product & {
    add?: boolean;
    modify?: boolean;
    del?: boolean;
    id?: number;
    edit?: boolean;
    onAdd?: () => void;
    onModify?: () => void;
    onDelete?: () => void;
    onEdit?: () => void;
}) {
    return (
        <div className="flex flex-col items-center justify-between gap-3 h-full shadow-box p-5 rounded-lg">
            <Image
                className="max-h-[200px] h-full object-cover p-2"
                alt={name}
                src={'http://localhost:4000/products/' + id + '.webp'}
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
            <div className="flex justify-center gap-2 w-full">
                {add && (
                    <button
                        className={`bg-[--cartel] w-full text-white py-3 rounded-xl font-bold capitalize flex justify-center`}
                        onClick={onAdd}
                    >
                        <span>Añadir</span>
                    </button>
                )}
                {edit && (
                    <button
                        className={`bg-[--cartel] w-full text-white py-3 rounded-xl font-bold capitalize flex justify-center`}
                        onClick={onEdit}
                    >
                        <span>Editar</span>
                    </button>
                )}
                {del && (
                    <button
                        className={`bg-[--header] text-white w-full py-3 rounded-xl font-bold capitalize flex justify-center`}
                        onClick={onDelete}
                    >
                        <span>Eliminar</span>
                    </button>
                )}
            </div>
        </div>
    );
}
