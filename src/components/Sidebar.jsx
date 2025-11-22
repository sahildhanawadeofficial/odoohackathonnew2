"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function Sidebar() {
    const segment = useSelectedLayoutSegment();
    // Will return: "Dashboard", "Inventory", "Addproduct", etc.

    const linkClasses = (name) =>
        `
        flex items-center gap-3 px-4 py-3 rounded-xl transition 
        ${segment === name
            ? "bg-blue-100 text-blue-700 font-semibold"
            : "text-gray-700 hover:bg-gray-100"}
        `;

    return (
        <aside
            className="
                h-full w-64 
                bg-white/60 backdrop-blur-2xl
                border-r border-white/40
                flex flex-col
            "
        >


            {/* Nav */}
            <nav className="flex-1 px-4 space-y-2 mt-4">

                <Link href="/Dashboard" className={linkClasses("Dashboard")}>
                    Dashboard
                </Link>

                <Link href="/Inventory" className={linkClasses("Inventory")}>
                    Inventory
                </Link>

                <Link href="/Addproduct" className={linkClasses("Addproduct")}>
                    Add Product
                </Link>

            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/40">
                <button
                    onClick={() => signOut()}
                    className="
                        w-full bg-gray-900 text-white 
                        hover:bg-gray-800 py-2 rounded-xl transition
                    "
                >
                    Logout
                </button>
            </div>
        </aside>
    );
}
