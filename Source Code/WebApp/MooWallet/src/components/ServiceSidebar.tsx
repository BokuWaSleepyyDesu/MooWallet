export default function ServiceSidebar() {
    return (
        <aside className="block ml-[2.5%] w-[17%]">
          <a className="flex text-inherit no-underline my-[1%] pl-[5%] rounded-[10px] hover:bg-[#dbdbdb] hover:bg-opacity-[1%] hover:font-bold" href="#/home">
            <img className="w-[10%]" src="/images/homeIcon.svg" />
            <p className="ml-[5%]">Home</p>
          </a>
          <a className="flex text-inherit no-underline my-[1%] pl-[5%] rounded-[10px] hover:bg-[#dbdbdb] hover:bg-opacity-[1%] hover:font-bold" href="#/services">
            <img className="w-[10%]" src="/images/servicesIcon.svg" />
            <p className="ml-[5%]">Services</p>
          </a>
          <a className="flex text-inherit no-underline my-[1%] pl-[5%] rounded-[10px] hover:bg-[#dbdbdb] hover:bg-opacity-[1%] hover:font-bold" href="#/account">
            <img className="w-[10%]" src="/images/accountIcon.svg" />
            <p className="ml-[5%]">Account</p>
          </a>
          <a className="flex text-inherit no-underline my-[1%] pl-[5%] rounded-[10px] hover:bg-[#dbdbdb] hover:bg-opacity-[1%] hover:font-bold" href="#/wallet">
            <img className="w-[10%]" src="/images/walletIcon.svg" />
            <p className="ml-[5%]">Wallet</p>
          </a>
          <a className="flex text-inherit no-underline my-[1%] pl-[5%] rounded-[10px] hover:bg-[#dbdbdb] hover:bg-opacity-[1%] hover:font-bold" href="#/statement">
            <img className="w-[10%]" src="/images/transactionHistoryIcon.svg" />
            <p className="ml-[5%]">Transaction History</p>
          </a>
        </aside>
    );
}