import { IconShoppingCart } from '@tabler/icons-react';
import Link from 'next/link';

export default function Cart({ storedOption }: { storedOption: string | undefined }) {
    return (
        <>
            {storedOption ? (
                <div className="flex items-center gap-4 space-x-4">
                    <div className="bg-[#f4dfbf] p-3 rounded-xl text-yellow-900 flex justify-center w-max font-bold">
                        <Link href="/order">EMPEZAR PEDIDO</Link>
                    </div>
                    <button>
                        <IconShoppingCart />
                    </button>
                </div>
            ) : (
                <div className="bg-[#f4dfbf] p-3 rounded-xl text-yellow-900 flex justify-center w-max font-bold">
                    <Link href="/order">EMPEZAR PEDIDO</Link>
                </div>
            )}
        </>
    );
}
