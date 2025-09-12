import type { ReactNode } from "react";

export default function AuthLayout({ children }: {children: ReactNode }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
            <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-6">MooWallet</h1>
                {children}
            </div>
        </div>
    )
}