import { useFetch } from '@/components/utils/useFetch';
import { revalidatePath } from 'next/cache';
import ProductsPage from '@/components/admin/productos/ProductsPage';

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
            <ProductsPage deleteProduct={deleteProduct} products={Products} />
        </main>
    );
}
