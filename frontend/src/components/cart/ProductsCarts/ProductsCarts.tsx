'use client';
import { useState } from 'react';
import ProductCart from './ProductCart';
import Button from '@/components/common/Button';

export default function ProductsCarts({
    cartProducts,
    Products,
    Ingredients,
    addToCart,
    removeFromCart,
    finishOrder
}: {
    cartProducts: CartProduct[];
    Products: Product[];
    Ingredients: Ingredient[];
    addToCart: (index: number) => void;
    removeFromCart: (index: number) => void;
    finishOrder: () => void;
}) {
    const [allCartProducts, setAllCartProducts] = useState<CartProduct[]>([...cartProducts]);

    const handleClickAddToCart = async (index: number) => {
        addToCart(index);

        let updatedCartProducts = [...allCartProducts];
        updatedCartProducts[index].quantity += 1;

        setAllCartProducts(updatedCartProducts);
    };

    const handleClickRemoveFromCart = async (index: number) => {
        removeFromCart(index);

        let updatedCartProducts = [...allCartProducts];
        updatedCartProducts[index].quantity -= 1;

        if (updatedCartProducts[index].quantity <= 0) {
            updatedCartProducts.splice(index, 1);
        }

        setAllCartProducts(updatedCartProducts);
    };

    return (
        <div className="flex flex-col gap-4 w-3/6">
            {allCartProducts.map((value: CartProduct, index: number) => (
                <ProductCart
                    key={index}
                    id={value.id}
                    quantity={value.quantity}
                    ingredientsRemoved={value.ingredientsRemoved}
                    ingredients={Ingredients}
                    product={Products.find(product => product.id === value.id) || ({} as Product)}
                    handleAddToCart={() => handleClickAddToCart(index)}
                    handleRemoveFromCart={() => handleClickRemoveFromCart(index)}
                />
            ))}
            <div className="flex justify-between mt-2">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-lg font-semibold">
                    {allCartProducts.reduce(
                        (acc, curr) =>
                            acc +
                            curr.quantity *
                                (Products?.find(product => product.id === curr.id)?.price || 0),
                        0
                    )}
                    €
                </span>
            </div>
            <Button style="greenDark" text="Finalizar compra" handleClick={finishOrder} />
        </div>
    );
}
