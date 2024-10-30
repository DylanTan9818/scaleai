import Image from "next/image";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  return (
    // Return me a navbar with a logo and a button in div. This is just a mock navbar
    <div className="flex justify-between items-center p-4 bg-white drop-shadow-sm">
      <Image src="/images/ScaleAI.svg" alt="scaleai" width={160} height={160} />
      <Button>Get Started!</Button>
    </div>
  );
};

export default NavBar;
