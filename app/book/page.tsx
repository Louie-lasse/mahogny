"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers";

export default function BookPage() {
    const { user, connection } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user || !connection) {
            router.push("/login"); // Redirect to login if not authenticated
        }
    }, [user, connection, router]);

    if (!user || !connection) return null;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold">Currently unavailable</h1>
            <button
                onClick={() => {
                    router.push("/");
                }}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
                Go back
            </button>
        </div>
    );
}
