'use client';

import { useState } from 'react';
import ActionsProducts from './ActionsProducts';
import ProductList from './ProductList';

export default function ProductsPage({
    products,
    deleteProduct
}: {
    products: Product[];
    deleteProduct(id: number): Promise<boolean>;
}) {
    const [allProducts, setAllProducts] = useState(products);

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold text-center">Gestionar Productos</h1>
                <ActionsProducts allProducts={allProducts} setAllProducts={setAllProducts} />
            </div>
            <ProductList
                allProducts={allProducts}
                deleteProduct={deleteProduct}
                setAllProducts={setAllProducts}
            />
        </div>
    );
}
