'use client';
import Product from '@/components/common/Product';

export default function ProductList({
    allProducts,
    deleteProduct,
    setAllProducts
}: {
    allProducts: Product[];
    deleteProduct(id: number): Promise<boolean>;
    setAllProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
    const delProduct = (id: number) => {
        const updatedProducts = allProducts.filter(product => product.id !== id);
        setAllProducts(updatedProducts);

        deleteProduct(id)
            .then(deleted => {
                if (!deleted) {
                    setAllProducts(prevProducts => [
                        ...prevProducts,
                        allProducts.find(product => product.id === id)!
                    ]);
                }
            })
            .catch(error => {
                console.error('Error al eliminar el producto:', error);
                setAllProducts(prevProducts => [
                    ...prevProducts,
                    allProducts.find(product => product.id === id)!
                ]);
            });
    };
    return (
        <div className="grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5 w-full py-6 items-center justify-center px-2 mt-6">
            {allProducts.map((value, index) => (
                <Product
                    key={index}
                    id={value.id}
                    name={value.name}
                    price={value.price}
                    image={value.image}
                    del={true}
                    onDelete={() => delProduct(value.id)}
                />
            ))}
        </div>
    );
}
