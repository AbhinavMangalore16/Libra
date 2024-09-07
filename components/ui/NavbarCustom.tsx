import { UserButton } from "@clerk/nextjs";
import MobileNavbar from "../MobileNavbar";
import { getAPILimit } from "@/lib/limits";

const NavbarCustom = async () => {
  const apiLimitCount = await getAPILimit();
  return (
    <div className="flex items-center p-4">
        <MobileNavbar apiLimitCount = {apiLimitCount}/>
      <div className="flex w-full justify-end">
        <UserButton />
      </div>
    </div>
  );
};
export default NavbarCustom;
