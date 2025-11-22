"use client";

import { useEffect, useState } from "react";
import { PencilSquareIcon, TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data
    const loadProducts = async () => {
        try {
            const res = await fetch("/api/products", { cache: "no-store" });
            const data = await res.json();
            if (data.success) setProducts(data.products);
        } catch (err) {
            console.error("Error loading products:", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    // Delete product
    const deleteProduct = async (id) => {
        if (!confirm("Do you really want to delete this product?")) return;

        try {
            const res = await fetch(`/api/products/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (data.success) {
                alert("Product deleted");
                loadProducts();
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("Something went wrong");
        }
    };

    // Category badge styling
    const categoryBadge = (cat) => (
        <span className="px-2 py-1 text-xs rounded-lg font-medium bg-blue-100 text-blue-700 shadow-sm">
            {cat}
        </span>
    );

    // Stock badge logic (You can replace this with real Stock model)
    const stockBadge = (qty) => {
        if (qty === 0)
            return (
                <span className="px-2 py-1 text-xs rounded-lg bg-red-100 text-red-700 font-medium">
                    Out of Stock
                </span>
            );

        if (qty < 20)
            return (
                <span className="px-2 py-1 text-xs rounded-lg bg-yellow-100 text-yellow-700 font-medium">
                    Low Stock
                </span>
            );

        return (
            <span className="px-2 py-1 text-xs rounded-lg bg-green-100 text-green-700 font-medium">
                In Stock
            </span>
        );
    };

    if (loading) {
        return <p className="text-gray-500">Loading products...</p>;
    }

    if (products.length === 0) {
        return <p className="text-gray-500">No products found.</p>;
    }

    return (
        <div className="p-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Inventory</h2>

                    <a
                        href="/Addproduct"
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-md transition"
                    >
                        <PlusCircleIcon className="w-5 h-5" />
                        Add New Product
                    </a>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto">
                    <table className="min-w-full rounded-xl overflow-hidden">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-sm border-b">
                                <th className="px-4 py-3 text-left font-semibold">Product</th>
                                <th className="px-4 py-3 text-left font-semibold">SKU</th>
                                <th className="px-4 py-3 text-left font-semibold">Category</th>
                                <th className="px-4 py-3 text-left font-semibold">Stock</th>
                                <th className="px-4 py-3 text-left font-semibold">Status</th>
                                <th className="px-4 py-3 text-right font-semibold">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="text-sm text-gray-700">
                            {products.map((p, index) => (
                                <tr
                                    key={p._id}
                                    className={`border-b last:border-none ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        } hover:bg-gray-100 transition`}
                                >
                                    <td className="px-4 py-3 font-medium">{p.name}</td>

                                    <td className="px-4 py-3">{p.sku}</td>

                                    <td className="px-4 py-3 flex gap-1 flex-wrap">
                                        {p.category?.length > 0
                                            ? p.category.map((c, i) => categoryBadge(c))
                                            : "—"}
                                    </td>

                                    {/* Dummy stock value for now */}
                                    <td className="px-4 py-3">{stockBadge(120)}</td>

                                    <td className="px-4 py-3">
                                        {p.isActive ? (
                                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-medium">
                                                Active
                                            </span>
                                        ) : (
                                            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs font-medium">
                                                Inactive
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-4 py-3 text-right flex items-center justify-end gap-3">
                                        <a
                                            href={`/Products/Edit/${p._id}`}
                                            className="text-blue-600 hover:text-blue-800 transition"
                                        >
                                            <PencilSquareIcon className="w-5 h-5" />
                                        </a>

                                        <button
                                            onClick={() => deleteProduct(p._id)}
                                            className="text-red-600 hover:text-red-800 transition"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
