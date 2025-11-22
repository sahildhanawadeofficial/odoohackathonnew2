"use client";

import { useEffect, useState } from "react";
import { PencilSquareIcon, TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal States
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Fetch Products
    const loadProducts = async () => {
        try {
            const res = await fetch("/api/products", { cache: "no-store" });
            const data = await res.json();
            if (data.success) setProducts(data.products);
        } catch (err) {
            toast.error("Error loading products");
        }
        setLoading(false);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    // Trigger Delete Modal
    const openDeleteModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    // Delete Product (Modal Confirm)
    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/products/${selectedProduct._id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Product deleted successfully");
                setShowModal(false);
                loadProducts();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Failed to delete product");
        }
    };

    // Category Badge
    const categoryBadge = (cat) => (
        <span className="px-2 py-1 text-xs rounded-lg font-medium bg-blue-100 text-blue-700 shadow-sm">
            {cat}
        </span>
    );

    // Stock Badge
    const stockBadge = (qty) => {
        if (qty === 0)
            return <span className="px-2 py-1 text-xs rounded-lg bg-red-100 text-red-700">Out of Stock</span>;

        if (qty < 20)
            return <span className="px-2 py-1 text-xs rounded-lg bg-yellow-100 text-yellow-700">Low Stock</span>;

        return <span className="px-2 py-1 text-xs rounded-lg bg-green-100 text-green-700">In Stock</span>;
    };

if (loading) {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            {/* Spinner */}
            <div className="w-12 h-12 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>

            {/* Text */}
            <h3 className="text-lg font-semibold text-gray-700 mt-4">
                Loading Products...
            </h3>

            <p className="text-gray-500 mt-1 text-sm">
                Please wait while we fetch your inventory.
            </p>
        </div>
    );
}
if (products.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="p-5 bg-gray-100 rounded-full shadow-sm">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M3 7h18M3 7l1.5 12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2L21 7M3 7l2-3h14l2 3"
                        stroke="#9CA3AF"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M10 11v6m4-6v6"
                        stroke="#9CA3AF"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            <h3 className="text-xl font-semibold text-gray-700 mt-4">
                No Products Found
            </h3>

            <p className="text-gray-500 mt-1 text-sm">
                Your inventory is empty. Start by adding a new product.
            </p>

            <a
                href="/Addproduct"
                className="mt-5 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl shadow-md transition"
            >
                Add Product
            </a>
        </div>
    );
}

    return (
        <div className="p-6">
            <ToastContainer position="top-right" autoClose={2000} />

            {/* MAIN CARD */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
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
                                            ? p.category.map((c) => categoryBadge(c))
                                            : "—"}
                                    </td>

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
                                            onClick={() => openDeleteModal(p)}
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

            {/* DELETE MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="flex flex-col items-center bg-white shadow-md rounded-xl py-6 px-5 w-[370px] md:w-[460px] border border-gray-200 animate-fadeIn">

                        {/* Icon */}
                        <div className="flex items-center justify-center p-4 bg-red-100 rounded-full">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M2.875 5.75h1.917m0 0h15.333m-15.333 0v13.417a1.917 1.917 0 0 0 1.916 1.916h9.584a1.917 1.917 0 0 0 1.916-1.916V5.75m-10.541 0V3.833a1.917 1.917 0 0 1 1.916-1.916h3.834a1.917 1.917 0 0 1 1.916 1.916V5.75m-5.75 4.792v5.75m3.834-5.75v5.75"
                                    stroke="#DC2626"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        <h2 className="text-gray-900 font-semibold mt-4 text-xl">
                            Are you sure?
                        </h2>

                        <p className="text-sm text-gray-600 mt-2 text-center">
                            Do you really want to delete<br />
                            <b>Product {selectedProduct?.name}</b>? <br />
                            This action cannot be undone.
                        </p>

                        <div className="flex items-center justify-center gap-4 mt-5 w-full">
                            <button
                                onClick={() => setShowModal(false)}
                                className="w-full md:w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100 active:scale-95 transition"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleDelete}
                                className="w-full md:w-36 h-10 rounded-md text-white bg-red-600 font-medium text-sm hover:bg-red-700 active:scale-95 transition"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
