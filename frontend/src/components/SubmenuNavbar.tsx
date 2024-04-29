'use client';
import { IconMenu2 } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';

export default function SubmenuNavbar({ links }: { links: { label: string; url: string }[] }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <button onClick={toggleMenu} className="md:hidden z-20">
                <IconMenu2 />
            </button>
            {menuOpen && (
                <div className="fixed inset-0 bg-[--header] z-10">
                    <div className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center">
                        <ul className="flex flex-col space-y-4 text-white">
                            {links.map((link, index) => (
                                <li key={index}>
                                    <Link className="font-semibold" href={link.url}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}
