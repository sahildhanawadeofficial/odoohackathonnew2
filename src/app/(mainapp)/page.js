"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();

  // While session is loading
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600">
        Loading...
      </div>
    );
  }

  // If NOT signed in → show login page
  if (!session) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-lg w-full p-8 rounded-3xl shadow-xl border bg-white text-center">

          {/* Title */}
          <h1 className="text-3xl font-extrabold text-slate-900">
            Inventory Management System
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 mt-3 text-sm leading-relaxed">
            Track your products, manage stock, and simplify your inventory workflow — all in one dashboard.
          </p>

          {/* Logo / Illustration */}
          <div className="mt-6 flex justify-center">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 opacity-90 shadow-lg"></div>
          </div>

          {/* Sign In Section */}
          <p className="mt-6 text-slate-700 font-medium">
            Sign in to continue
          </p>

          <button
            onClick={() => signIn("google")}
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

  // If signed in → show welcome screen
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-6">

      <h1 className="text-4xl font-extrabold text-slate-900">
        Welcome, {session.user.name}! 👋
      </h1>

      <p className="text-slate-600 mt-3">
        You're logged in. Let's manage your inventory efficiently.
      </p>

      <button
        onClick={() => signOut()}
        className="mt-6 bg-slate-800 text-white px-6 py-2 rounded-xl hover:bg-slate-900 transition"
      >
        Sign Out
      </button>
    </div>
  );
}
