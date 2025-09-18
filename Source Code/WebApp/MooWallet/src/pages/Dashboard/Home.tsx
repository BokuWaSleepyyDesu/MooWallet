import Advertisement from "./Advertisement";
import AllServices from "./AllServices";
import MainServices from "./MainServices";

export default function Home() {
    return (
        <main className="flex-1 flex flex-col">
            <MainServices />
            <AllServices />
            <Advertisement />
        </main>
    )
}