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
    categories,
    createCategory
}: {
    products: Product[];
    deleteProduct(id: number): Promise<boolean>;
    ingredients: Ingredient[];
    createProduct(val: Product): Promise<number | null>;
    createIngredient(val: string): Promise<number | null>;
    createCategory(val: string, val2: string): Promise<number | null>;
    categories: Category[];
}) {
    const [allProducts, setAllProducts] = useState(products);
    const [allIngredients, setAllIngredients] = useState(ingredients);
    const [allCategories, setAllCategories] = useState(categories);

    return (
        <div>
            <div className="flex justify-end max-sm:justify-center items-center">
                <ActionsProducts
                    allProducts={allProducts}
                    setAllProducts={setAllProducts}
                    allIngredients={allIngredients}
                    setAllIngredients={setAllIngredients}
                    createProduct={createProduct}
                    createIngredient={createIngredient}
                    categories={allCategories}
                    setCategories={setAllCategories}
                    createCategory={createCategory}
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
