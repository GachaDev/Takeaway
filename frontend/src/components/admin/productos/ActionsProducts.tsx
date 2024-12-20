import { useState } from 'react';
import ModalNewProduct from './Modals/ModalNewProduct';
import ModalNewIngredient from './Modals/ModalNewIngredient';
import ModalNewCategory from './Modals/ModalNewCategory';
import { UseFetch } from '@/components/utils/UseFetch';

export default function ActionsProducts({
    allProducts,
    setAllProducts,
    allIngredients,
    setAllIngredients,
    createProduct,
    createIngredient,
    categories,
    createCategory,
    setCategories
}: {
    allProducts: Product[];
    setAllProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    allIngredients: Ingredient[];
    setAllIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
    createProduct(val: Product): Promise<number | null>;
    createIngredient(val: string): Promise<number | null>;
    categories: Category[];
    createCategory(val: string, val2: string): Promise<number | null>;
}) {
    const [modalNewProduct, setModalNewProduct] = useState(false);
    const [modalNewIngredient, setModalNewIngredient] = useState(false);
    const [modalNewCategory, setModalNewCategory] = useState(false);

    const handleCreateProduct = async (product: Product, file: File | null) => {
        try {
            const newProductId = await createProduct(product);
            if (newProductId !== null) {
                product.id = newProductId;
                if (file) {
                    try {
                        const formData = new FormData();
                        formData.append('image', file);

                        const response = await fetch(
                            `http://localhost:4000/products/upload/${newProductId}`,
                            {
                                method: 'POST',
                                body: formData
                            }
                        );

                        if (!response.ok) {
                            throw new Error('Failed to upload image: ' + response.statusText);
                        }
                    } catch (error) {
                        console.error('Error uploading image:', error);
                    }
                }
                setAllProducts(prevProducts => [...prevProducts, product]);
            } else {
                console.error('Failed to create product');
            }
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const handleCreateIngredient = async (val: string) => {
        try {
            const newId = await createIngredient(val);
            if (newId !== null) {
                setAllIngredients(prev => [...prev, { id: newId, name: val }]);
            } else {
                console.error('Failed to create ingredient');
            }
        } catch (error) {
            console.error('Error creating ingredient:', error);
        }
    };

    const handleCreateCategory = async (name: string, label: string) => {
        try {
            const newId = await createCategory(name, label);
            if (newId !== null) {
                setCategories(prev => [...prev, { id: newId, name: name, label: label }]);
            } else {
                console.error('Failed to create category');
            }
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    return (
        <>
            <div className="flex flex-wrap justify-end gap-2">
                <button
                    onClick={() => {
                        setModalNewProduct(true);
                    }}
                    className={`bg-[--header] p-3 text-white rounded-xl font-bold capitalize flex justify-center`}
                >
                    <span>Nuevo producto</span>
                </button>
                <button
                    onClick={() => {
                        setModalNewIngredient(true);
                    }}
                    className={`bg-[--cartel] text-white p-3 rounded-xl font-bold capitalize flex justify-center`}
                >
                    <span>Nuevo Ingrediente</span>
                </button>
                <button
                    onClick={() => {
                        setModalNewCategory(true);
                    }}
                    className={`border border-[--cartel]  text-yellow-900 p-3 rounded-xl font-bold capitalize flex justify-center`}
                >
                    <span>Nueva Categoría</span>
                </button>
            </div>
            <ModalNewProduct
                close={() => {
                    setModalNewProduct(false);
                }}
                allIngredients={allIngredients}
                open={modalNewProduct}
                createProduct={handleCreateProduct}
                categories={categories}
            />
            <ModalNewCategory
                close={() => {
                    setModalNewCategory(false);
                }}
                createCategory={handleCreateCategory}
                open={modalNewCategory}
            />
            <ModalNewIngredient
                close={() => {
                    setModalNewIngredient(false);
                }}
                createIngredient={handleCreateIngredient}
                open={modalNewIngredient}
            />
        </>
    );
}
