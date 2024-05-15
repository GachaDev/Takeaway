import { useFetch } from '@/components/utils/useFetch';
import ActionsProducts from '@/components/admin/productos/ActionsProducts';
import ProductList from '@/components/admin/productos/ProductList';
import { revalidatePath } from 'next/cache';

export const revalidate = Infinity;
export default async function Productos() {
    const Products = (await (await useFetch(`/products`, 'GET')).json()) as Product[];

    const deleteProduct = async (id: number) => {
        'use server';
        const result = await useFetch('/products/' + id, 'DELETE');
        revalidatePath('/admin/productos');
        return result.ok;
    };

    return (
        <main className="p-5">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold text-center">Gestionar Productos</h1>
                <ActionsProducts />
            </div>
            <ProductList products={Products} deleteProduct={deleteProduct} />
        </main>
    );
}
