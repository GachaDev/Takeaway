'use client';
import { toast } from 'sonner';
import Product from '../common/Product';

export default function AllProducts({
    products,
    handleAddToCart
}: {
    products: Product[];
    handleAddToCart: (product: Product) => void;
}) {
    return (
        <div className="grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5 w-full py-6 items-center justify-center px-2 mt-6">
            {products.map((value, index) => (
                <Product
                    key={index}
                    id={value.id}
                    name={value.name}
                    price={value.price}
                    image={value.image}
                    add
                    modify
                    onAdd={() => {
                        handleAddToCart(value);
                        toast.success('Producto agregado al carrito');
                    }}
                />
            ))}
        </div>
    );
}
