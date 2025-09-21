export default function MainServices() {

    return (
        <div className="grid grid-cols-4 gap-[5%] border border-[#4b4b4b] rounded-[15px] p-[3%]">
            <button className="flex justify-center items-center border-none bg-transparent cursor-pointer pt-[5%] pb-[5%] rounded-[15px] hover:bg-[#f2f2f2]">
                <img className="w-[45px]" src="/images/walletLoadIcon.svg" />
                <p className="ml-[10%]">Load</p>
            </button>
            <button className="flex justify-center items-center border-none bg-transparent cursor-pointer pt-[5%] pb-[5%]  rounded-[15px] hover:bg-[#f2f2f2]">
                <img className="w-[45px]" src="/images/walletSendIcon.svg" />
                <p className="ml-[10%]">Transfer</p>
            </button>
            <button className="flex justify-center items-center border-none bg-transparent cursor-pointer pt-[5%] pb-[5%]  rounded-[15px] hover:bg-[#f2f2f2]">
                <img className="w-[45px]" src="/images/walletSendIcon.svg" />
                <p className="ml-[10%]">Safe Transfer</p>
            </button>
            <button className="flex justify-center items-center border-none bg-transparent cursor-pointer pt-[5%] pb-[5%]  rounded-[15px] hover:bg-[#f2f2f2]">
                <img className="w-[45px]" src="/images/bankIcon.svg" />
                <p className="ml-[10%]">Bank Transfer</p>
            </button>
        </div>
    )
}