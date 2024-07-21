import { UserButton } from "@clerk/nextjs";
import MobileNavbar from "../MobileNavbar";

const NavbarCustom = () => {
  return (
    <div className="flex items-center p-4">
        <MobileNavbar/>
      <div className="flex w-full justify-end">
        <UserButton />
      </div>
    </div>
  );
};
export default NavbarCustom;
