import type { Metadata } from 'next';
import './globals.css';
import '@mantine/core/styles.css';
import { Toaster } from 'sonner';
import { MantineProvider } from '@mantine/core';
import Footer from '@/components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';

export const metadata: Metadata = {
    title: 'MDK Burguer'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className="h-screen overflow-auto">
                <div className="flex flex-col justify-between h-full">
                    <Navbar />
                    <MantineProvider>{children}</MantineProvider>
                    <Footer />
                </div>
                <Toaster />
            </body>
        </html>
    );
}
