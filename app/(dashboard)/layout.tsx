import Navbar from "@/components/Navbar";
import NavbarCustom from "@/components/ui/NavbarCustom";

const DashboardLayout =({
    children
}:{
    children: React.ReactNode
}) =>{
    return(
    <div className="h-full relative">
        <div className="hidden md:flex flex-col fixed w-72 inset-y-0 z-[60] bg-[#1A1A2E]">
            <div>
                <Navbar/>
            </div>
        </div>
        <main className="pl-72">
            <NavbarCustom/>
            {children}
        </main>
    </div>
    );
}

export default DashboardLayout;