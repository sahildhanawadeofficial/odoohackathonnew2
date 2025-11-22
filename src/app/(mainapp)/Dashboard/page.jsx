"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    // Calculated insights
    const totalProducts = products.length;
    const activeProducts = products.filter((p) => p.isActive).length;
    const inactiveProducts = totalProducts - activeProducts;

    const categoryCounts = {};
    products.forEach((p) => {
        p.category.forEach((cat) => {
            categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
        });
    });

    const topCategories = Object.entries(categoryCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    useEffect(() => {
        async function loadData() {
            try {
                const res = await fetch("/api/products");

                if (!res.ok) {
                    toast.error("Failed to load products");
                    return;
                }

                const data = await res.json();

                if (!data.success) {
                    toast.error(data.message || "Error fetching data");
                    return;
                }

                setProducts(data.products);
            } catch (err) {
                toast.error("Server error while loading dashboard");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
                Loading dashboard...
            </div>
        );
    }

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100">
            <div className="flex-1 p-6">

                <header className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
                        <p className="text-sm text-slate-500">Welcome back 👋</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Quick Stats */}
                    <div className="md:col-span-2 bg-white/70 backdrop-blur-xl p-5 rounded-3xl shadow border border-white/50">
                        <h2 className="text-lg font-semibold mb-3">Quick Stats</h2>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="p-4 bg-white/70 rounded-xl shadow text-center">
                                <p className="text-sm text-gray-500">Total Products</p>
                                <p className="text-2xl font-bold mt-2">{totalProducts}</p>
                            </div>

                            <div className="p-4 bg-white/70 rounded-xl shadow text-center">
                                <p className="text-sm text-gray-500">Active</p>
                                <p className="text-2xl font-bold mt-2">{activeProducts}</p>
                            </div>

                            <div className="p-4 bg-white/70 rounded-xl shadow text-center">
                                <p className="text-sm text-gray-500">Inactive</p>
                                <p className="text-2xl font-bold mt-2">{inactiveProducts}</p>
                            </div>
                        </div>
                    </div>

                    {/* Top Categories */}
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-3xl text-white shadow-xl">
                        <h2 className="text-xl font-semibold">Top Categories</h2>
                        <p className="text-sm text-blue-100">Your most used product groups</p>

                        <div className="mt-4">
                            {topCategories.map(([cat, count]) => (
                                <div key={cat} className="text-sm mb-1">
                                    {cat} — <span className="font-bold">{count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Selling Products — placeholder until we create orders API */}
                    <div className="md:col-span-3 bg-white/70 backdrop-blur-xl p-6 rounded-3xl shadow border border-white/40">
                        <h2 className="text-lg font-semibold mb-4">Recently Added Products</h2>

                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-gray-600 border-b">
                                    <th className="py-2">Product</th>
                                    <th className="py-2">Category</th>
                                    <th className="py-2">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.slice(0, 5).map((p) => (
                                    <tr key={p._id} className="border-b">
                                        <td className="py-3">{p.name}</td>
                                        <td>{p.category.join(", ")}</td>
                                        <td className={p.isActive ? "text-green-600" : "text-red-600"}>
                                            {p.isActive ? "Active" : "Inactive"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
}
