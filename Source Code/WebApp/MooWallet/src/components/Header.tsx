import { useAuth } from "../context/AuthContext";

export default function Header() {
    const { user } = useAuth();

    return (
        <div className="absolute flex w-[100%] justify-center items-center gap-[50%] bg-[#FDF6EC]">
            <div className="flex">
                <img className="w-[10%] h-[10%] mt-[1.8%]" src="/MooWalletLogo.png" />
                <p className="text-[1.5rem]">Wallet</p>
            </div>
            <div className="flex">
                <img src="" />
                <div className="block justify-center items-center">
                    <p className="text-[#4c4c4c] text-center font-[700]">{user?.name || "Full Name"}</p>
                    <p className="mt-[-7%] text-[#4c4c4c] text-center">{user?.phoneNo || "Phone Number"}</p>
                </div>
            </div>
        </div>
    )
}