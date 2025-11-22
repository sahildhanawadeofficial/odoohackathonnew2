import Connectdb from "@/middleware/Connectdb";
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/authOptions";


export const GET = Connectdb(async (req, { params }) => {
    try {
        const { id } = await params;

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const product = await Product.findById(id);

        if (!product) {
            return NextResponse.json(
                { success: false, message: "Product not found" },
                { status: 404 }
            );
        }

        // Ownership check
        if (product.userEmail !== session.user.email) {
            return NextResponse.json(
                { success: false, message: "Access denied" },
                { status: 403 }
            );
        }

        return NextResponse.json(
            { success: true, product },
            { status: 200 }
        );

    } catch (error) {
        console.error("GET PRODUCT ERROR:", error);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
});


// =============================
// UPDATE PRODUCT (OWNER ONLY)
// =============================
export const PUT = Connectdb(async (req, { params }) => {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const existing = await Product.findById(id);

        if (!existing) {
            return NextResponse.json(
                { success: false, message: "Product not found" },
                { status: 404 }
            );
        }

        // Ownership check
        if (existing.userEmail !== session.user.email) {
            return NextResponse.json(
                { success: false, message: "Access denied" },
                { status: 403 }
            );
        }

        // Read new data from body
        const body = await req.json();
        const { name, sku, category, unit, description, isActive } = body;

        let categoryArray = [];

        if (typeof category === "string") {
            categoryArray = category.split(",").map((c) => c.trim());
        } else if (Array.isArray(category)) {
            categoryArray = category;
        }

        const updated = await Product.findByIdAndUpdate(
            id,
            {
                name,
                sku,
                category: categoryArray,
                unit,
                description,
                isActive,
            },
            { new: true }
        );

        return NextResponse.json(
            { success: true, message: "Product updated", product: updated },
            { status: 200 }
        );

    } catch (error) {
        console.error("UPDATE PRODUCT ERROR:", error);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
});


// =============================
// DELETE PRODUCT (OWNER ONLY)
// =============================
export const DELETE = Connectdb(async (req, { params }) => {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const existing = await Product.findById(id);

        if (!existing) {
            return NextResponse.json(
                { success: false, message: "Product not found" },
                { status: 404 }
            );
        }

        // Ownership check
        if (existing.userEmail !== session.user.email) {
            return NextResponse.json(
                { success: false, message: "Access denied" },
                { status: 403 }
            );
        }

        await Product.findByIdAndDelete(id);

        return NextResponse.json(
            { success: true, message: "Product deleted" },
            { status: 200 }
        );

    } catch (error) {
        console.error("DELETE PRODUCT ERROR:", error);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
});
