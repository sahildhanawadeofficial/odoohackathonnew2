"use client";

import { signIn } from "next-auth/react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-lg w-full p-8 rounded-3xl shadow-xl border bg-white text-center">
        
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-slate-900">
          Inventory Management System
        </h1>

        {/* Subtitle */}
        <p className="text-slate-600 mt-3 text-sm leading-relaxed">
          Track your products, manage stock levels, view analytics, and simplify 
          your entire inventory workflow — all in one powerful dashboard.
        </p>

        {/* Illustration (optional minimal design look) */}
        <div className="mt-6 flex justify-center">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 opacity-90 shadow-lg"></div>
        </div>

        {/* Sign In Section */}
        <p className="mt-6 text-slate-700 font-medium">
          Sign in to continue
        </p>

        <button
          onClick={() => signIn()}
          className="w-full mt-4 bg-red-500 text-white font-semibold py-3 rounded-xl shadow hover:bg-red-600 transition-all"
        >
          Continue with Google
        </button>

        <p className="mt-4 text-xs text-slate-400">
          Secure login powered by NextAuth.js
        </p>
      </div>
    </div>
  );
}
