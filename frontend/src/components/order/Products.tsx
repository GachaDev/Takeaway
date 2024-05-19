'use client';
import { toast } from 'sonner';
import Product from '../common/Product';
import { useState } from 'react';
import ModalRemoveIngredient from './ModalRemoveIngredient';

export default function AllProducts({
    products,
    handleAddToCart
}: {
    products: Product[];
    handleAddToCart: (product: Product) => void;
}) {
    const [openModal, setOpenModal] = useState(false);
    const [productSelected, setProductSelected] = useState<Product | null>(null);
    const getTotalIngredientsToRemove = (product: Product) => {
        let total = 0;
        if (product.productIngredients) {
            product.productIngredients.forEach(_ => {
                total += 1;
            });
        }
        return total;
    };

    const addProductToCart = (product: Product) => {
        const totalIngredientsToRemove = getTotalIngredientsToRemove(product);
        if (totalIngredientsToRemove > 0) {
            setProductSelected(product);
            setOpenModal(true);
        } else {
            handleAddToCart(product);
            toast.success('Producto agregado al carrito');
        }
    };

    const finishAddToCart = (checkedState: IngredientState) => {
        const productIngredients = productSelected?.productIngredients || [];
        productIngredients.forEach(value => {
            if (checkedState[value.ingredient.name]) {
                value.can_remove = false;
            }
        });
        if (productSelected) {
            handleAddToCart(productSelected);
            toast.success('Producto agregado al carrito');
            setProductSelected(null);
            setOpenModal(false);
        }
    };

    return (
        <>
            <div className="grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5 w-full py-6 items-center justify-center px-2 mt-6">
                {products.map((value, index) => (
                    <Product
                        key={index}
                        id={value.id}
                        name={value.name}
                        price={value.price}
                        add
                        modify
                        onAdd={() => {
                            addProductToCart(value);
                        }}
                    />
                ))}
            </div>
            <ModalRemoveIngredient
                product={productSelected}
                opened={openModal}
                close={() => setOpenModal(false)}
                finishAddToCart={finishAddToCart}
            />
        </>
    );
}
