import Navbar from "@/components/Navbar";
import NavbarCustom from "@/components/ui/NavbarCustom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
            <Analytics/>
            <SpeedInsights />
        </main>
    </div>
    );
}

export default DashboardLayout;