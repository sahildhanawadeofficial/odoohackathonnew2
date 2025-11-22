"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-toastify"; // ✅ Import toast

// ----------------------
// ZOD SCHEMA
// ----------------------
const schema = z.object({
    name: z.string().min(2, "Name is required"),
    sku: z.string().min(1, "SKU is required"),
    category: z.string().min(1, "At least one category required"),
    unit: z.string().min(1, "Unit is required"),
    description: z.string().optional(),
    isActive: z.boolean().default(true),
});

// ----------------------
// COMPONENT
// ----------------------
export default function AddProductForm() {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            sku: "",
            category: "",
            unit: "",
            description: "",
            isActive: true,
        },
    });

    const onSubmit = async (data) => {
        setLoading(true);

        const payload = {
            ...data,
            category: data.category.split(",").map((c) => c.trim()),
        };

        try {
            const res = await fetch("/api/products", {
                method: "POST",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) {
                toast.error("Failed to create product ❌"); // ✅ Toast
                return;
            }

            toast.success("Product created successfully! 🎉"); // ✅ Toast
            reset();

        } catch (error) {
            console.error(error);
            toast.error("Error creating product 🚫"); // ✅ Toast
        }

        setLoading(false);
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center text-sm text-slate-800 m-5"
            >
                <p className="text-xs bg-indigo-200 text-indigo-600 font-medium px-3 py-1 rounded-full">
                    Add Product
                </p>

                <h1 className="text-3xl font-bold py-4 text-center">
                    Create a New Product
                </h1>

                <p className="max-md:text-sm text-gray-500 pb-8 text-center">
                    Fill all required details carefully to add a new product.
                </p>

                <div className="max-w-xl w-full px-4">

                    {/* Product Name */}
                    <label className="font-medium">Product Name</label>
                    <div className="flex items-center mt-2 mb-3 h-11 pl-3 border border-slate-300 rounded-full 
                        focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#475569">
                            <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
                        </svg>
                        <input
                            {...register("name")}
                            className="h-full px-3 w-full outline-none bg-transparent"
                            placeholder="Enter product name"
                        />
                    </div>
                    {errors.name && <p className="text-red-600 text-xs">{errors.name.message}</p>}

                    {/* SKU */}
                    <label className="font-medium mt-4">SKU</label>
                    <div className="flex items-center mt-2 mb-3 h-11 pl-3 border border-slate-300 rounded-full 
                        focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
                        <svg width="20" height="20" fill="#475569" viewBox="0 0 24 24">
                            <path d="M4 4h16v2H4zm0 6h16v2H4zm0 6h16v2H4z" />
                        </svg>
                        <input
                            {...register("sku")}
                            className="h-full px-3 w-full outline-none bg-transparent"
                            placeholder="SKU / Unique Code"
                        />
                    </div>
                    {errors.sku && <p className="text-red-600 text-xs">{errors.sku.message}</p>}

                    {/* CATEGORY */}
                    <label className="font-medium mt-4">Category</label>
                    <div className="flex items-center mt-2 mb-3 h-11 pl-3 border border-slate-300 rounded-full 
                        focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
                        <svg width="20" height="20" fill="#475569" viewBox="0 0 24 24">
                            <path d="M3 3h18v6H3zm0 12h18v6H3z" />
                        </svg>
                        <input
                            {...register("category")}
                            className="h-full px-3 w-full outline-none bg-transparent"
                            placeholder="eg: Electronics, Hardware"
                        />
                    </div>
                    {errors.category && <p className="text-red-600 text-xs">{errors.category.message}</p>}

                    {/* UNIT */}
                    <label className="font-medium mt-4">Unit</label>
                    <div className="flex items-center mt-2 mb-3 h-11 pl-3 border border-slate-300 rounded-full 
                        focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
                        <svg width="20" height="20" fill="#475569" viewBox="0 0 24 24">
                            <path d="M4 4h16v16H4z" />
                        </svg>
                        <input
                            {...register("unit")}
                            className="h-full px-3 w-full outline-none bg-transparent"
                            placeholder="Piece / Kg / Unit"
                        />
                    </div>
                    {errors.unit && <p className="text-red-600 text-xs">{errors.unit.message}</p>}

                    {/* DESCRIPTION */}
                    <label className="font-medium mt-4">Description (optional)</label>
                    <textarea
                        {...register("description")}
                        rows="4"
                        className="w-full mt-2 p-3 bg-transparent border border-slate-300 rounded-lg resize-none 
                            outline-none focus:ring-2 focus-within:ring-indigo-400 transition-all"
                        placeholder="Enter product description"
                    ></textarea>

                    {/* ACTIVE SWITCH */}
                    <div className="flex items-center gap-3 mt-5">
                        <input
                            type="checkbox"
                            {...register("isActive")}
                            className="h-4 w-4 accent-indigo-600"
                            defaultChecked
                        />
                        <span className="font-medium">Active Product</span>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center gap-1 mt-6 bg-indigo-500 hover:bg-indigo-600 
                            text-white py-2.5 w-full rounded-full transition"
                    >
                        {loading ? "Saving..." : "Create Product"}

                        <svg className="mt-0.5" width="21" height="20" fill="#fff" viewBox="0 0 21 20">
                            <path d="m18.038 10.663-5.625 5.625a.94.94 0 0 1-1.328-1.328l4.024-4.023H3.625a.938.938 0 0 1 0-1.875h11.484l-4.022-4.025a.94.94 0 0 1 1.328-1.328l5.625 5.625a.935.935 0 0 1-.002 1.33" />
                        </svg>
                    </button>
                </div>
            </form>
        </>
    );
}
