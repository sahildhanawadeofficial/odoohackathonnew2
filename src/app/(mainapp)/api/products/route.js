import Connectdb from "@/middleware/Connectdb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/authOptions";
import Product from "@/models/Product";

export const POST = Connectdb(async (req) => {
    try {
        // -------------------------
        // AUTH CHECK
        // -------------------------
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        // -------------------------
        // READ REQUEST BODY
        // -------------------------
        const body = await req.json();

        const { name, sku, category, unit, description, isActive } = body;

        // Basic checks
        if (!name || !sku || !unit) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Convert string → array (if not already)
        let categoryArray = [];

        if (typeof category === "string") {
            categoryArray = category.split(",").map((c) => c.trim());
        } else if (Array.isArray(category)) {
            categoryArray = category;
        }

        // -------------------------
        // SAVE PRODUCT TO MONGODB
        // -------------------------
        const product = await Product.create({
            name,
            sku,
            category: categoryArray,
            unit,
            description,
            isActive: isActive ?? true,
            userEmail: session.user.email
        });

        return NextResponse.json(
            {
                success: true,
                message: "Product created successfully",
                product,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("PRODUCT CREATE ERROR:", error);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
});



export const GET = Connectdb(async (req) => {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const products = await Product.find({
            userEmail: session.user.email   // << FILTER BY OWNER
        }).sort({ createdAt: -1 });

        return NextResponse.json(
            { success: true, products },
            { status: 200 }
        );
    } catch (error) {
        console.error("GET PRODUCTS ERROR:", error);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
});
