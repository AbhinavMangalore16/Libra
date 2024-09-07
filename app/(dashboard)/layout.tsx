import Navbar from "@/components/Navbar";
import NavbarCustom from "@/components/ui/NavbarCustom";
import { getAPILimit } from "@/lib/limits";

const DashboardLayout = async({
    children
}:{
    children: React.ReactNode
}) =>{
    const APILimit = await getAPILimit();
    return(
    <div className="h-full relative">
        <div className="hidden md:flex md:flex-col md:fixed w-72 inset-y-0 bg-[#1A1A2E]">
            <div>
                <Navbar apiLimitCount = {APILimit}/>
            </div>
        </div>
        <main className="md:pl-72">
            <NavbarCustom/>
            {children}
        </main>
    </div>
    );
}

export default DashboardLayout;