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
    addToCart: (product: Product) => void;
    removeFromCart: (product: Product) => void;
    finishOrder: () => void;
}) {
    const [allCartProducts, setAllCartProducts] = useState<CartProduct[]>([...cartProducts]);

    console.log(allCartProducts);

    const handleClickAddToCart = async (value: Product) => {
        addToCart(value);
        setAllCartProducts(
            allCartProducts.map((cartProduct: CartProduct) => {
                if (cartProduct.id === value.id) {
                    return { ...cartProduct, quantity: cartProduct.quantity + 1 };
                }
                return cartProduct;
            })
        );
    };

    const handleClickRemoveFromCart = async (value: Product) => {
        removeFromCart(value);
        const updatedCartProducts = allCartProducts
            .map((cartProduct: CartProduct) => {
                if (cartProduct.id === value.id && cartProduct.quantity > 0) {
                    return { ...cartProduct, quantity: cartProduct.quantity - 1 };
                }
                return cartProduct;
            })
            .filter(cartProduct => cartProduct.quantity !== 0);

        setAllCartProducts(updatedCartProducts);
    };

    return (
        <div className="flex flex-col gap-4 w-3/6">
            {allCartProducts.map(
                (
                    value: { id: number; quantity: number; ingredientsRemoved: { id: number }[] },
                    index: number
                ) => (
                    <ProductCart
                        key={index}
                        id={value.id}
                        quantity={value.quantity}
                        ingredientsRemoved={value.ingredientsRemoved}
                        ingredients={Ingredients}
                        product={
                            Products.find(product => product.id === value.id) || ({} as Product)
                        }
                        handleAddToCart={() =>
                            handleClickAddToCart(
                                Products.find(product => product.id === value.id) || ({} as Product)
                            )
                        }
                        handleRemoveFromCart={() =>
                            handleClickRemoveFromCart(
                                Products.find(product => product.id === value.id) || ({} as Product)
                            )
                        }
                    />
                )
            )}
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
