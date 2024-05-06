import type { Metadata } from 'next';
import './globals.css';
import { IconBrandFacebook, IconBrandInstagram, IconBrandX, IconPhone } from '@tabler/icons-react';
import Link from 'next/link';
import logo from '../../public/logo.webp';
import Image from 'next/image';
import SubmenuNavbar from '@/components/navbar/SubmenuNavbar';
import { Toaster } from 'sonner';
import Cart from '@/components/cart/Cart';

export const metadata: Metadata = {
    title: 'MDK Burguer'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const socialMedias = [
        {
            icon: <IconBrandFacebook color="white" />,
            url: 'https://www.facebook.com/markzuckerberg'
        },
        {
            icon: <IconBrandInstagram color="white" />,
            url: 'https://www.instagram.com/MovistarKOI'
        },
        { icon: <IconBrandX color="white" />, url: 'https://www.x.com/MovistarKOI' }
    ];

    const links = [
        { label: 'Pedido Tracker', url: '/tracker' },
        { label: 'Mi cuenta', url: '/profile' }
    ];

    return (
        <html lang="es" className="h-full overflow-hidden">
            <body className="h-full overflow-hidden">
                <header className="flex flex-col">
                    <nav className="bg-[--header] p-2 flex justify-end gap-2 max-sm:justify-center">
                        {socialMedias.map((media, index) => (
                            <Link key={index} href={media.url}>
                                {media.icon}
                            </Link>
                        ))}
                        <a href="tel:956556677" className="text-white flex gap-2 ml-2">
                            <IconPhone color="white" /> 956 556 677
                        </a>
                    </nav>
                    <nav className="text-black p-4 px-8 flex justify-between items-center border-b border-gray-300 shadow">
                        <div>
                            <Link href="/">
                                <Image alt="Logo del Burguer" src={logo} width={50} height={50} />
                            </Link>
                        </div>
                        <SubmenuNavbar links={links} />
                        <ul className="flex space-x-4 gap-4 font-semibold items-center text-md max-md:hidden">
                            {links.map((media, index) => (
                                <li key={index}>
                                    <Link href={media.url}>{media.label}</Link>
                                </li>
                            ))}
                            <Cart />
                        </ul>
                    </nav>
                </header>
                <main className="flex-grow overflow-auto heightDefault">
                    {children}
                    <Toaster />
                </main>
            </body>
        </html>
    );
}
