import { useState } from "react";

type DropdownKey = "services" | "account" | "wallet" | null;

export default function ServiceSidebar() {
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  
  const toggleDropdown = (menu: Exclude<DropdownKey, null>) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const buttonClasses = (menu: DropdownKey) =>
    `flex my-[1%] pl-[5%] py-[2%] border-none bg-transparent rounded-[10px] cursor-pointer hover:bg-[#dbdbdb] hover:bg-opacity-[30%] hover:font-bold 
     ${openDropdown === menu ? "bg-[#dbdbdb] font-bold" : ""}`;

    return (
        <aside className="block ml-[2.5%] w-[17%]">
          <a className="flex text-inherit no-underline my-[1%] pl-[5%] rounded-[10px] hover:bg-[#dbdbdb] hover:bg-opacity-[1%] hover:font-bold" href="#/home">
            <img className="w-[10%]" src="/images/homeIcon.svg" />
            <p className="ml-[5%]">Home</p>
          </a>
          <button onClick={() => toggleDropdown("services")} className={buttonClasses("services")}>
            <img className="w-[10%]" src="/images/servicesIcon.svg" />
            <p className="ml-[5%]">Services</p>
            <p className="ml-auto pr-[10%]">▶</p>
          </button>
          {openDropdown == "services" &&
            <div className="flex-col ml-[15%] transition-all duration-300 ease-in-out ">
              <a className="block text-inherit no-underline my-[1%] pl-[5%] py-[5%] rounded-[10px] hover:bg-[#dbdbdb] hover:bg-opacity-[1%] hover:font-bold" href="">Topup</a>
              <a className="block text-inherit no-underline my-[1%] pl-[5%] py-[5%] rounded-[10px] hover:bg-[#dbdbdb] hover:bg-opacity-[1%] hover:font-bold" href="">Internet</a>
              <a className="block text-inherit no-underline my-[1%] pl-[5%] py-[5%] rounded-[10px] hover:bg-[#dbdbdb] hover:bg-opacity-[1%] hover:font-bold" href="">Landline</a>
              <a className="block text-inherit no-underline my-[1%] pl-[5%] py-[5%] rounded-[10px] hover:bg-[#dbdbdb] hover:bg-opacity-[1%] hover:font-bold" href="">Water</a>
              <a className="block text-inherit no-underline my-[1%] pl-[5%] py-[5%] rounded-[10px] hover:bg-[#dbdbdb] hover:bg-opacity-[1%] hover:font-bold" href="">Electricity</a>
              <a className="block text-inherit no-underline my-[1%] pl-[5%] py-[5%] rounded-[10px] hover:bg-[#dbdbdb] hover:bg-opacity-[1%] hover:font-bold" href="">School/College</a>
            </div>}
          <button onClick={() => toggleDropdown("account")} className={buttonClasses("account")}>
            <img className="w-[10%]" src="/images/accountIcon.svg" />
            <p className="ml-[5%]">Account</p>
            <p className="ml-auto pr-[10%]">▶</p>
          </button>
          {openDropdown == "account" &&
            <div className="flex-col ml-[15%]">
              <a className="block text-inherit no-underline my-[1%] pl-[5%] py-[5%] rounded-[10px] hover:bg-[#dbdbdb] hover:bg-opacity-[1%] hover:font-bold" href="">Profile</a>
              <a className="block text-inherit no-underline my-[1%] pl-[5%] py-[5%] rounded-[10px] hover:bg-[#dbdbdb] hover:bg-opacity-[1%] hover:font-bold" href="">Change Password</a>
              <a className="block text-inherit no-underline my-[1%] pl-[5%] py-[5%] rounded-[10px] hover:bg-[#dbdbdb] hover:bg-opacity-[1%] hover:font-bold" href="">MPIN</a>
              <a className="block text-inherit no-underline my-[1%] pl-[5%] py-[5%] rounded-[10px] hover:bg-[#dbdbdb] hover:bg-opacity-[1%] hover:font-bold" href="">QR Code</a>
            </div>}
          <button onClick={() => toggleDropdown("wallet")} className={buttonClasses("wallet")}>
            <img className="w-[10%]" src="/images/walletIcon.svg" />
            <p className="ml-[5%]">Wallet</p>
            <p className="ml-auto pr-[10%]">▶</p>
          </button>
          {openDropdown == "wallet" &&
            <div className="flex-col ml-[15%]">
              <a className="block text-inherit no-underline my-[1%] pl-[5%] py-[5%] rounded-[10px] hover:bg-[#dbdbdb] hover:bg-opacity-[1%] hover:font-bold" href="">Load Wallet</a>
              <a className="block text-inherit no-underline my-[1%] pl-[5%] py-[5%] rounded-[10px] hover:bg-[#dbdbdb] hover:bg-opacity-[1%] hover:font-bold" href="">Transfer</a>
              <a className="block text-inherit no-underline my-[1%] pl-[5%] py-[5%] rounded-[10px] hover:bg-[#dbdbdb] hover:bg-opacity-[1%] hover:font-bold" href="">Safe Transfer</a>
              <a className="block text-inherit no-underline my-[1%] pl-[5%] py-[5%] rounded-[10px] hover:bg-[#dbdbdb] hover:bg-opacity-[1%] hover:font-bold" href="">Bank Transfer</a>
            </div>}
          <a className="flex text-inherit no-underline my-[1%] pl-[5%] rounded-[10px] hover:bg-[#dbdbdb] hover:bg-opacity-[1%] hover:font-bold" href="#/statement">
            <img className="w-[10%]" src="/images/transactionHistoryIcon.svg" />
            <p className="ml-[5%]">Transaction History</p>
          </a>
        </aside>
    );
}