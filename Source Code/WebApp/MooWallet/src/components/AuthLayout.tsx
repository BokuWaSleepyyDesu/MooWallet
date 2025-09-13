import type { ReactNode } from "react";

export default function AuthLayout({ children }: {children: ReactNode }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(241deg,rgba(250,249,246,1)_0%,rgba(181,197,227,1)_100%)]">
            <div className="relative w-11/12 max-w-[1269px] h-[60vh] md:h-[70vh] bg-[rgba(255,255,255,1)] rounded-[45px] mx-auto mt-12 shadow-lg overflow-hidden flex">
                <div className="w-[56.9%] overflow-hidden rounded-l-[45px]">
                    <img className="w-full h-full object-cover object-center" src="/images/Cow.png" alt="Cow" />
                </div>
                <div className="flex-1 p-8 md:p-12 flex flex-col relative">
                    <h1 className="absolute top-[10.92%] left-[7.1%] text-left font-normal text-[#4b4b4b] text-5xl">MooWallet</h1>

                    <div className="flex-1 flex items-center justify-center">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}