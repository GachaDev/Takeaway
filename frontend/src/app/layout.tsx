import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Pizzeria Conan',
    description: 'Generated by create next app'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <nav>Navbar</nav>
                {children}
            </body>
        </html>
    );
}
