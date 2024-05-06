import { IconShoppingCart } from '@tabler/icons-react';
import Link from 'next/link';

export default function Cart({ storedOption }: { storedOption: string | undefined }) {
    return (
        <>
            {storedOption ? (
                <div className="flex items-center gap-4 space-x-4">
                    <li className="bg-yellow-500 p-2 rounded-xl font-bold">
                        <Link href="/order">HACER PEDIDO</Link>
                    </li>
                    <button>
                        <IconShoppingCart />
                    </button>
                </div>
            ) : (
                <li className="bg-yellow-500 p-3 rounded-xl font-bold">
                    <Link href="/order">HACER PEDIDO</Link>
                </li>
            )}
        </>
    );
}
