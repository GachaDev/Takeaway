'use client';
import { IconShoppingCart } from '@tabler/icons-react';
import Link from 'next/link';

export default function Cart() {
    const storedOption = localStorage.getItem('pickupOption');

    return (
        <>
            {storedOption ? (
                <div className="flex items-center">
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
