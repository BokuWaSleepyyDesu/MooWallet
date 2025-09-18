export default function AllServices() {

    return (
        <div className="mt-[4%] border border-[#4b4b4b] rounded-[15px] p-[3%] pb-[5%]">
            <div className="mt-[-3%]">
                <h4>Recharge & Payments</h4>
            </div>
            <div className="grid grid-cols-5 gap-[5%] gap-y-[10%]">
                <button onClick={() => {}} className="flex flex-col justify-center items-center border-none bg-transparent cursor-pointer pt-[10%] rounded-[15px] hover:bg-[#f2f2f2]">
                    <img className="w-[45px] items-center" src="/images/topupIcon.svg" />
                    <p className="text-center">Topup</p>
                </button>
                <button onClick={() => {}} className="flex flex-col justify-center items-center border-none bg-transparent cursor-pointer pt-[10%] rounded-[15px] hover:bg-[#f2f2f2]">
                    <img className="w-[45px] items-center" src="/images/internetIcon.svg" />
                    <p className="text-center">Internet</p>
                </button>
                <button onClick={() => {}} className="flex flex-col justify-center items-center border-none bg-transparent cursor-pointer pt-[10%] rounded-[15px] hover:bg-[#f2f2f2]">
                    <img className="w-[45px] items-center" src="/images/landlineIcon.svg" />
                    <p className="text-center">Landline</p>
                </button>
                <button onClick={() => {}} className="flex flex-col justify-center items-center border-none bg-transparent cursor-pointer pt-[10%] rounded-[15px] hover:bg-[#f2f2f2]">
                    <img className="w-[45px] items-center" src="/images/waterIcon.svg" />
                    <p className="text-center">Water</p>
                </button>
                <button onClick={() => {}} className="flex flex-col justify-center items-center border-none bg-transparent cursor-pointer pt-[10%] rounded-[15px] hover:bg-[#f2f2f2]">
                    <img className="w-[45px] items-center" src="/images/electricityIcon.svg" />
                    <p className="text-center">Electricity</p>
                </button>
                <button onClick={() => {}} className="flex flex-col justify-center items-center border-none bg-transparent cursor-pointer pt-[10%] rounded-[15px] hover:bg-[#f2f2f2]">
                    <img className="w-[45px] items-center" src="/images/educationIcon.svg" />
                    <p className="text-center">School/College</p>
                </button>
            </div>
        </div>    
    )
}