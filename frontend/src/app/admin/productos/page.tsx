import { useFetch } from '@/components/utils/useFetch';
import { revalidatePath } from 'next/cache';
import ProductsPage from '@/components/admin/productos/ProductsPage';

export const revalidate = Infinity;
export default async function Productos() {
    const Products = (await (await useFetch(`/products`, 'GET')).json()) as Product[];
    const Ingredients = (await (await useFetch(`/ingredients`, 'GET')).json()) as Ingredient[];

    const deleteProduct = async (id: number) => {
        'use server';
        const result = await useFetch('/products/' + id, 'DELETE');
        revalidatePath('/admin/productos');
        return result.ok;
    };

    const createProduct = async (form: Product) => {
        'use server';
        const result = await useFetch(
            '/products',
            'POST',
            JSON.stringify({
                name: form.name,
                description: form.description,
                image: form.image,
                price: form.price,
                ingredientsToAdd: form.ingredients
            })
        );

        if (result.ok) {
            const createdProduct = await result.json();
            revalidatePath('/admin/productos');
            return createdProduct.lastInsertId;
        } else {
            return null;
        }
    };

    return (
        <main className="p-5">
            <ProductsPage
                deleteProduct={deleteProduct}
                createProduct={createProduct}
                products={Products}
                ingredients={Ingredients}
            />
        </main>
    );
}
