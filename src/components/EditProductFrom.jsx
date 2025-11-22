"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

// ----------------------
// ZOD SCHEMA
// ----------------------
const schema = z.object({
    name: z.string().min(2, "Name is required"),
    sku: z.string().min(1, "SKU is required"),
    category: z.string().optional(),
    unit: z.string().min(1, "Unit is required"),
    description: z.string().optional(),
    isActive: z.boolean().default(true),
});

export default function EditProductForm({ id }) {
    const [loading, setLoading] = useState(true);

    console.log('idddd', id)

    const {
        register,
        handleSubmit,
        reset,
        setValue,
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

    // ----------------------
    // LOAD PRODUCT DATA
    // ----------------------
    const loadProduct = async () => {
        try {
            const res = await fetch(`/api/products/${id}`, {
                cache: "no-store",
            });

            const data = await res.json();

            if (!data.success) {
                toast.error("Product not found");
                return;
            }

            const product = data.product;


            // Fill form
            setValue("name", product.name);
            setValue("sku", product.sku);
            setValue("unit", product.unit);
            setValue("description", product.description || "");
            setValue("isActive", product.isActive);

            // Convert array → string for UI
            setValue(
                "category",
                Array.isArray(product.category)
                    ? product.category.join(", ")
                    : product.category || ""
            );

        } catch (error) {
            console.error(error);
            toast.error("Error loading product");
        }

        setLoading(false);
    };

    useEffect(() => {
        loadProduct();
    }, []);

    // ----------------------
    // HANDLE UPDATE
    // ----------------------
    const onSubmit = async (data) => {
        try {
            const payload = {
                ...data,
                category: data.category
                    ? data.category.split(",").map((c) => c.trim())
                    : [],
            };

            const res = await fetch(`/api/products/${id}`, {
                method: "PUT",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" },
            });

            const resp = await res.json();

            if (!resp.success) {
                toast.error(resp.message || "Update failed");
                return;
            }

            toast.success("Product updated successfully!");

        } catch (error) {
            console.error(error);
            toast.error("Server error");
        }
    };

    if (loading) {
        return <p className="text-gray-500">Loading...</p>;
    }

    // ----------------------
    // FORM UI
    // ----------------------
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center text-sm text-slate-800 w-full"
        >


            <h1 className="text-3xl font-bold py-4 text-center">
                Update Product Details
            </h1>

            <p className="max-md:text-sm text-gray-500 pb-8 text-center">
                Make changes and update the product information.
            </p>

            <div className="max-w-xl w-full px-4">
                {/* NAME */}
                <label className="font-medium">Product Name</label>
                <div className="flex items-center mt-2 mb-4 h-11 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
                    <input
                        {...register("name")}
                        className="h-full px-3 w-full outline-none bg-transparent"
                        placeholder="Enter product name"
                    />
                </div>
                {errors.name && (
                    <p className="text-red-600 text-sm -mt-3 mb-4">
                        {errors.name.message}
                    </p>
                )}

                {/* SKU */}
                <label className="font-medium">SKU</label>
                <div className="flex items-center mt-2 mb-4 h-11 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
                    <input
                        {...register("sku")}
                        className="h-full px-3 w-full outline-none bg-transparent"
                        placeholder="SKU / Unique Code"
                    />
                </div>
                {errors.sku && (
                    <p className="text-red-600 text-sm -mt-3 mb-4">
                        {errors.sku.message}
                    </p>
                )}

                {/* CATEGORY */}
                <label className="font-medium">Category</label>
                <div className="flex items-center mt-2 mb-4 h-11 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
                    <input
                        {...register("category")}
                        className="h-full px-3 w-full outline-none bg-transparent"
                        placeholder="Electronics, Hardware"
                    />
                </div>

                {/* UNIT */}
                <label className="font-medium">Unit (UOM)</label>
                <div className="flex items-center mt-2 mb-4 h-11 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
                    <input
                        {...register("unit")}
                        className="h-full px-3 w-full outline-none bg-transparent"
                        placeholder="pcs, kg, box"
                    />
                </div>
                {errors.unit && (
                    <p className="text-red-600 text-sm -mt-3 mb-4">
                        {errors.unit.message}
                    </p>
                )}

                {/* DESCRIPTION */}
                <label className="font-medium">Description</label>
                <textarea
                    {...register("description")}
                    rows="4"
                    className="w-full mt-2 mb-4 p-3 bg-transparent border border-slate-300 rounded-xl resize-none outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                    placeholder="Optional"
                />

                {/* ACTIVE */}
                <div className="flex items-center gap-2 mb-4 mt-1">
                    <input
                        type="checkbox"
                        {...register("isActive")}
                        className="h-4 w-4"
                    />
                    <label className="text-slate-700">Is Active</label>
                </div>

                {/* SUBMIT */}
                <button
                    type="submit"
                    className="flex items-center justify-center gap-2 mt-3 bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 w-full rounded-full transition text-sm"
                >
                    Update Product
                </button>
            </div>
        </form>

    );
}
