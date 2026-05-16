import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();

    return (
        <header className="bg-violet-800 h-[62px] text-white px-5">
            <button  onClick={() => router.push('/environment/games/chess')} className="cursor-pointer gap-1 h-full flex items-center ">
                <div>
                    <ArrowLeft height={28} width={28} />
                </div>
                <p className="text-xl font-semibold">Sky Chess</p>
            </button>
        </header>
    )
}

export default Header;