'use client';

export default function ActionsProducts() {
    return (
        <div className="flex gap-2">
            <button
                className={`bg-[--header] p-3 text-white rounded-xl font-bold capitalize flex justify-center`}
            >
                <span>Nuevo producto</span>
            </button>
            <button
                className={`bg-[--cartel] text-white p-3 rounded-xl font-bold capitalize flex justify-center`}
            >
                <span>Nuevo Ingrediente</span>
            </button>
        </div>
    );
}
