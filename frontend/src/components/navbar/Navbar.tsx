import Link from 'next/link';
import { cookies } from 'next/headers';
import Image from 'next/image';
import logo from '../../../public/logo.webp';
import Cart from '@/components/cart/Cart';
import SubmenuNavbar from './SubmenuNavbar';

export default function Navbar() {
    const links = [
        { label: 'Pedido Tracker', url: '/tracker' },
        { label: 'Mi cuenta', url: '/profile' }
    ];
    return (
        <nav className="text-black p-4 px-8 flex justify-between items-center border-b border-gray-300 shadow">
            <div>
                <Link href="/">
                    <Image alt="Logo del Burguer" src={logo} width={125} height={125} />
                </Link>
            </div>
            <SubmenuNavbar links={links} />
            <ul className="flex space-x-4 gap-4 font-semibold items-center text-md max-md:hidden">
                {links.map((media, index) => (
                    <li key={index}>
                        <Link href={media.url}>{media.label}</Link>
                    </li>
                ))}
                <Cart storedOption={cookies().get('pickupOption')?.value} />
            </ul>
        </nav>
    );
}
