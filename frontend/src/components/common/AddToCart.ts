import { cookies } from 'next/headers';

export const handleAddToCart = async (product: Product) => {
    'use server';
    const cart = cookies().get('cart')?.value;

    let cartProducts = cart ? JSON.parse(cart) : [];

    let ingredientsRemoved = [] as { id: number }[];
    if (product.productIngredients) {
        product.productIngredients.forEach(value => {
            if (!value.can_remove) {
                ingredientsRemoved.push({ id: value.id });
            }
        });
    }

    const compareIngredients = (a: { id: number }[], b: { id: number }[]) => {
        if (a.length !== b.length) return false;
        return a.every((ingredientA, index) => ingredientA.id === b[index].id);
    };

    const existingProductIndex = cartProducts.findIndex(
        (cartProduct: { id: number; ingredientsRemoved: { id: number }[] }) => {
            return (
                cartProduct.id === product.id &&
                compareIngredients(cartProduct.ingredientsRemoved, ingredientsRemoved)
            );
        }
    );

    if (existingProductIndex !== -1) {
        cartProducts[existingProductIndex].quantity += 1;
    } else {
        cartProducts.push({ id: product.id, quantity: 1, ingredientsRemoved });
    }

    cookies().set('cart', JSON.stringify(cartProducts), {
        expires: new Date().getTime() + 1000 * 60 * 60 * 24 * 365,
        sameSite: true,
        httpOnly: true,
        secure: true
    });
};

export const handleRemoveFromCart = async (product: Product) => {
    'use server';
    const cart = cookies().get('cart')?.value;

    let cartProducts = cart ? JSON.parse(cart) : [];

    const existingProductIndex = cartProducts.findIndex(
        (cartProduct: { id: number }) => cartProduct.id === product.id
    );

    if (existingProductIndex !== -1) {
        if (cartProducts[existingProductIndex].quantity > 1) {
            cartProducts[existingProductIndex].quantity -= 1;
        } else {
            cartProducts.splice(existingProductIndex, 1);
        }
    }

    cookies().set('cart', JSON.stringify(cartProducts), {
        expires: new Date().getTime() + 1000 * 60 * 60 * 24 * 365,
        sameSite: true,
        httpOnly: true,
        secure: true
    });
};

export const handlePlusCart = async (existingProductIndex: number) => {
    'use server';
    const cart = cookies().get('cart')?.value;

    let cartProducts = cart ? JSON.parse(cart) : [];

    cartProducts[existingProductIndex].quantity += 1;

    cookies().set('cart', JSON.stringify(cartProducts), {
        expires: new Date().getTime() + 1000 * 60 * 60 * 24 * 365,
        sameSite: true,
        httpOnly: true,
        secure: true
    });
};

export const handleMinusCart = async (existingProductIndex: number) => {
    'use server';
    const cart = cookies().get('cart')?.value;

    let cartProducts = cart ? JSON.parse(cart) : [];

    cartProducts[existingProductIndex].quantity -= 1;

    if (cartProducts[existingProductIndex].quantity <= 0) {
        cartProducts.splice(existingProductIndex, 1);
    }

    cookies().set('cart', JSON.stringify(cartProducts), {
        expires: new Date().getTime() + 1000 * 60 * 60 * 24 * 365,
        sameSite: true,
        httpOnly: true,
        secure: true
    });
};
