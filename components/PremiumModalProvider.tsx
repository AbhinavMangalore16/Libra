"use client";

import { useEffect, useState } from "react";
import { PremiumModal } from "./PremiumModal";

export const PremiumModalProvider = () => {
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);
  if (!mount) {
    return null;
  }
  return (
    <>
      <PremiumModal />
    </>
  );
};
