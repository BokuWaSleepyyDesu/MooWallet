export default function MainServices() {

    return (
        <div className="grid grid-cols-4 gap-[5%] border border-[#4b4b4b] rounded-[15px] p-[3%]">
            <div className="flex">
                <img className="w-[45px]" src="/images/walletLoadIcon.svg" />
                <p className="ml-[10%]">Load</p>
            </div>
            <div className="flex">
                <img className="w-[45px]" src="/images/walletSendIcon.svg" />
                <p className="ml-[10%]">Transfer</p>
            </div>
            <div className="flex">
                <img className="w-[45px]" src="/images/walletSendIcon.svg" />
                <p className="ml-[10%]">Safe Transfer</p>
            </div>
            <div className="flex">
                <img className="w-[45px]" src="/images/bankIcon.svg" />
                <p className="ml-[10%]">Bank Transfer</p>
            </div>
        </div>
    )
}