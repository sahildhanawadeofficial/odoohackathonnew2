"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
    const { data: session, status } = useSession();
    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const user = session?.user;

    return (
        <nav className="flex items-center justify-between px-6 py-1 border-b border-gray-300 bg-white relative transition-all">


            <Link href="/">
                <Image
            src="/logo3.png"
            width={120}
            height={50}
            alt="App Logo"
            className="rounded-full drop-shadow-md"
            priority
          />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">





                {/* AUTH AREA */}
                {status === "authenticated" ? (
                    <div className="relative">
                        <Image
                            src={user?.image || "/default-user.png"}
                            alt="Profile"
                            width={40}
                            height={40}
                            className="rounded-full cursor-pointer border object-cover"
                            onClick={() => setMenuOpen(!menuOpen)}
                        />


                        {menuOpen && (
                            <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-md w-40 py-2 text-sm">
                                <Link
                                    href="/profile"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={() => signIn()}
                        className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
                    >
                        Login
                    </button>
                )}
            </div>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setOpen(!open)}
                aria-label="Menu"
                className="sm:hidden"
            >
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none">
                    <rect width="21" height="1.5" rx=".75" fill="#426287" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                </svg>
            </button>

            {/* Mobile Menu */}
            <div className={`${open ? "flex" : "hidden"} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <Link href="/Dashboard">Dashboard</Link>
                <Link href="/Inventory">Inventory</Link>
                <Link href="/Addproduct">Addproduct</Link>

                {status === "authenticated" ? (
                    <div className="flex items-center gap-3 mt-2">
                        <Image
                            src={user?.image || "/default-user.png"}
                            alt="Profile"
                            width={40}
                            height={40}
                            className="rounded-full border object-cover"
                        />
                        <button
                            onClick={() => signOut()}
                            className="px-4 py-2 bg-red-500 text-white rounded-full text-sm"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm"
                        onClick={() => signIn()}
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
}

