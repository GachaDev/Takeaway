import type { Metadata } from 'next';
import './globals.css';
import { IconBrandFacebook, IconBrandInstagram, IconBrandX } from '@tabler/icons-react';
import Link from 'next/link';
import logo from '../../public/logo.webp';
import Image from 'next/image';
import SubmenuNavbar from '@/components/navbar/SubmenuNavbar';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
    title: 'MDK Burguer'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const socialMedias = [
        { icon: <IconBrandFacebook color="white" />, url: 'https://www.facebook.com/nada' },
        { icon: <IconBrandInstagram color="white" />, url: 'https://www.instagram.com/nada' },
        { icon: <IconBrandX color="white" />, url: 'https://www.twitter.com/nada' }
    ];

    const links = [
        { label: 'Nuestra carta', url: '/carta' },
        { label: 'Pedido Tracker', url: '/tracker' },
        { label: 'Mi cuenta', url: '/profile' }
    ];

    return (
        <html lang="es" className="h-full overflow-hidden">
            <body className="h-full overflow-hidden">
                <header className="flex flex-col">
                    <nav className="bg-[--header] p-2 flex justify-end gap-2">
                        {socialMedias.map((media, index) => (
                            <Link key={index} href={media.url}>
                                {media.icon}
                            </Link>
                        ))}
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
                            <li className="bg-yellow-500 p-3 rounded-xl font-bold">
                                <Link href="/order">HACER PEDIDO</Link>
                            </li>
                        </ul>
                    </nav>
                </header>
                <main
                    className="flex-grow overflow-auto heightDefault"
                    style={{ maxHeight: `calc(100vh - 116px)` }}
                >
                    {children}
                    <Toaster />
                </main>
            </body>
        </html>
    );
}
