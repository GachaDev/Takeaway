import { UseFetch } from '@/components/utils/UseFetch';
import { revalidatePath, revalidateTag } from 'next/cache';
import ProductsPage from '@/components/admin/productos/ProductsPage';

export const revalidate = Infinity;
export default async function Productos() {
    const Products = (await (
        await UseFetch(`/products`, 'GET', '', ['products'])
    ).json()) as Product[];
    const Ingredients = (await (
        await UseFetch(`/ingredients`, 'GET', '', ['ingredients'])
    ).json()) as Ingredient[];
    const Categories = (await (
        await UseFetch(`/categories`, 'GET', '', ['categories'])
    ).json()) as Category[];

    const deleteProduct = async (id: number) => {
        'use server';
        const result = await UseFetch('/products/' + id, 'DELETE');
        revalidatePath('/admin/productos');
        revalidatePath('/order');
        return result.ok;
    };

    const createProduct = async (form: Product) => {
        'use server';
        const result = await UseFetch(
            '/products',
            'POST',
            JSON.stringify({
                name: form.name,
                description: form.description,
                price: form.price,
                ingredientsToAdd: form.ingredients,
                category: form.category?.id
            })
        );

        if (result.ok) {
            const createdProduct = await result.json();
            revalidateTag('products');
            return createdProduct.lastInsertId;
        } else {
            return null;
        }
    };

    const createIngredient = async (val: string) => {
        'use server';
        const result = await UseFetch(
            '/ingredients',
            'POST',
            JSON.stringify({
                name: val
            })
        );

        if (result.ok) {
            const created = await result.json();
            revalidateTag('ingredients');
            return created.lastInsertId;
        } else {
            return null;
        }
    };

    const createCategory = async (name: string, label: string) => {
        'use server';
        const result = await UseFetch(
            '/categories',
            'POST',
            JSON.stringify({
                name: name,
                label: label
            })
        );

        if (result.ok) {
            const created = await result.json();
            revalidateTag('categories');
            return created.lastInsertId;
        } else {
            return null;
        }
    };

    return (
        <main className="p-5">
            <ProductsPage
                deleteProduct={deleteProduct}
                createProduct={createProduct}
                createIngredient={createIngredient}
                createCategory={createCategory}
                products={Products}
                ingredients={Ingredients}
                categories={Categories}
            />
        </main>
    );
}
