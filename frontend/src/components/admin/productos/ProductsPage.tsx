'use client';

import { useState } from 'react';
import ActionsProducts from './ActionsProducts';
import ProductList from './ProductList';

export default function ProductsPage({
    products,
    deleteProduct,
    ingredients,
    createProduct,
    createIngredient,
    categories
}: {
    products: Product[];
    deleteProduct(id: number): Promise<boolean>;
    ingredients: Ingredient[];
    createProduct(val: Product): Promise<number | null>;
    createIngredient(val: string): Promise<number | null>;
    categories: Category[];
}) {
    const [allProducts, setAllProducts] = useState(products);
    const [allIngredients, setAllIngredients] = useState(ingredients);

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold text-center">Gestionar Productos</h1>
                <ActionsProducts
                    allProducts={allProducts}
                    setAllProducts={setAllProducts}
                    allIngredients={allIngredients}
                    setAllIngredients={setAllIngredients}
                    createProduct={createProduct}
                    createIngredient={createIngredient}
                    categories={categories}
                />
            </div>
            <ProductList
                allProducts={allProducts}
                deleteProduct={deleteProduct}
                setAllProducts={setAllProducts}
            />
        </div>
    );
}
