import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
    const { user } = useAuth();
    const { logout } = useAuth();
    const [dropdownState, setDropdownState] = useState(false);

    return (
        <div className="sticky top-[0%] z-[50] flex w-[100%] justify-center items-center gap-[75%] bg-[#FDF6EC]">
            <div className="flex">
                <img className="w-[3.5rem] h-[3.5rem] mt-[.7rem]" src="/MooWalletLogo.png" />
                <p className="text-[1.5rem]">Wallet</p>
            </div>
            <div onMouseEnter={() => setDropdownState(true)} onMouseLeave={() => setDropdownState(false)}>
                <div className="flex">
                    <img src="" />
                    <div className="block justify-center items-center">
                        <p className="text-[#4c4c4c] text-center font-[700]">{user?.name || "Full Name"}</p>
                        <p className="mt-[-10%] text-[#4c4c4c] text-center">{user?.phoneNo || "Phone Number"}</p>
                    </div>
                </div>
                {dropdownState && (
                <div className="fixed right-[6.5%] w-[7%] border border-[#c3c3c3] justify-center items-center">
                    <div className="flex">
                        <button onClick={() => console.log("Logout clicked")} className="flex-1 m-[.5rem] text-center py-[.4rem] text-[#000000] border-0 bg-transparent hover:bg-[#f2f2f2]">My Profile</button>
                    </div>
                    <div className="flex justify-center items-center">
                        <svg width="80%" height="1" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="1" x2="100%" y2="1" stroke="#4b4b4b" stroke-width="1" /></svg>
                    </div>
                    <div className="flex">
                        <button onClick={logout} className="flex-1 m-[.5rem] text-center py-[.4rem] text-[#000000] border-0 bg-transparent hover:bg-[#f2f2f2]">Logout</button>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}