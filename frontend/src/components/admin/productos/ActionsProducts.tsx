'use client';

import { useState } from 'react';
import ModalNewProduct from './Modals/ModalNewProduct';

export default function ActionsProducts({
    allProducts,
    setAllProducts,
    allIngredients,
    setAllIngredients,
    createProduct
}: {
    allProducts: Product[];
    setAllProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    allIngredients: Ingredient[];
    setAllIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
    createProduct(val: Product): void;
}) {
    const [modalNewProduct, setModalNewProduct] = useState(false);
    return (
        <>
            <div className="flex gap-2">
                <button
                    onClick={() => {
                        setModalNewProduct(true);
                    }}
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
            <ModalNewProduct
                close={() => {
                    setModalNewProduct(false);
                }}
                allIngredients={allIngredients}
                open={modalNewProduct}
                createProduct={createProduct}
            />
        </>
    );
}
