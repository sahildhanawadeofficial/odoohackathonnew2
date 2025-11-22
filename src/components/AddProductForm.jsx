"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

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
            category: data.category.split(",").map((c) => c.trim()), // convert "cat1, cat2" → ["cat1","cat2"]
        };

        try {
            const res = await fetch("/api/products", {
                method: "POST",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) {
                alert("Failed to create product");
                return;
            }

            alert("Product created successfully!");
            reset();

        } catch (error) {
            console.error(error);
            alert("Error creating product");
        }

        setLoading(false);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 p-6 border rounded-lg shadow-md bg-white"
        >
            {/* NAME */}
            <div>
                <label className="block font-medium mb-1">Product Name</label>
                <input
                    {...register("name")}
                    className="w-full p-2 border rounded"
                    placeholder="Enter product name"
                />
                {errors.name && (
                    <p className="text-red-600 text-sm">{errors.name.message}</p>
                )}
            </div>

            {/* SKU */}
            <div>
                <label className="block font-medium mb-1">SKU</label>
                <input
                    {...register("sku")}
                    className="w-full p-2 border rounded"
                    placeholder="SKU / Unique Code"
                />
                {errors.sku && (
                    <p className="text-red-600 text-sm">{errors.sku.message}</p>
                )}
            </div>

            {/* CATEGORY */}
            <div>
                <label className="block font-medium mb-1">Category</label>
                <input
                    {...register("category")}
                    className="w-full p-2 border rounded"
                    placeholder="eg: Electronics, Hardware"
                />
                <p className="text-gray-500 text-xs mt-1">
                    Separate multiple categories with commas
                </p>
                {errors.category && (
                    <p className="text-red-600 text-sm">{errors.category.message}</p>
                )}
            </div>

            {/* UNIT */}
            <div>
                <label className="block font-medium mb-1">Unit (UOM)</label>
                <input
                    {...register("unit")}
                    className="w-full p-2 border rounded"
                    placeholder="e.g. pcs, kg, box"
                />
                {errors.unit && (
                    <p className="text-red-600 text-sm">{errors.unit.message}</p>
                )}
            </div>

            {/* DESCRIPTION */}
            <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea
                    {...register("description")}
                    className="w-full p-2 border rounded"
                    placeholder="Optional"
                />
            </div>

            {/* ACTIVE / INACTIVE */}
            <div className="flex items-center gap-2">
                <input type="checkbox" {...register("isActive")} />
                <label>Is Active</label>
            </div>

            {/* BUTTON */}
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
            >
                {loading ? "Saving..." : "Add Product"}
            </button>
        </form>
    );
}
