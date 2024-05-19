'use client';
import Image from 'next/image';
import { IconMinus, IconPlus } from '@tabler/icons-react';
interface CartProduct {
    id: number;
    quantity: number;
}

export default function ProductCart({
    id,
    quantity,
    product,
    handleAddToCart,
    handleRemoveFromCart,
    ingredients,
    ingredientsRemoved
}: {
    id: number;
    quantity: number;
    product: Product;
    handleAddToCart: (product: CartProduct) => void;
    handleRemoveFromCart: (product: CartProduct) => void;
    ingredients: Ingredient[];
    ingredientsRemoved: { id: number }[];
}) {
    const handleClickAddToCart = () => {
        handleAddToCart({ id, quantity } as CartProduct);
    };

    return (
        <div className="flex items-center justify-start rounded-lg w-full">
            <Image
                className="max-h-[200px] h-full object-cover p-2"
                alt={product.name}
                src={'http://localhost:4000/products/' + id + '.webp'}
                width={150}
                height={150}
            />
            <div className="flex flex-col p-2 w-full">
                <span className="font-bold">{product.name}</span>

                {ingredientsRemoved.length >= 1 && (
                    <div className="flex gap-2 mt-2">
                        <span className="font-bold">Ingredientes eliminados:</span>

                        {ingredientsRemoved.map((removedIngredient, key) => {
                            const ingredient = product.productIngredients?.find(
                                ingredient => ingredient.id === removedIngredient.id
                            );
                            return (
                                ingredient && (
                                    <span key={removedIngredient.id}>
                                        {ingredient.ingredient.name}
                                        {key !== ingredientsRemoved.length - 1 && ', '}
                                    </span>
                                )
                            );
                        })}
                    </div>
                )}
                <div className="flex justify-between items-center gap-2 mt-2">
                    <span>{product.price}€</span>
                    <div className="flex justify-between gap-2">
                        <button onClick={handleClickAddToCart}>
                            <IconPlus color="#4c392c" size={15} />
                        </button>
                        <span className="font-bold">{quantity}</span>
                        <button
                            onClick={() => handleRemoveFromCart({ id, quantity } as CartProduct)}
                        >
                            <IconMinus color="#613d25" size={15} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
