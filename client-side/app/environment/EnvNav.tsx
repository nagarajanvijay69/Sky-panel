import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const EnvNav = () => {
    const router = useRouter();
    return <>
        <nav className={`text-white w-[100dvw] flex justify-between h-[60px] px-3 bg-violet-800`}>
                              <div className="left h-full cursor-pointer flex items-center gap-1" onClick={() => router.push('/dashboard/apps')}>
                                   <div className="left-icon">
                                        <ArrowLeft height={30} width={30} className="" />
                                   </div>
                                   <p className="text-xl cursor-pointer font-semibold">Back</p>
                              </div>
                         </nav>
    </>
}

export default EnvNav;