"use client";

import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";

const MobileNavbar = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() =>{
    setIsMounted(true);
  },[])
  if (!isMounted){
    return null;
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Navbar/>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
