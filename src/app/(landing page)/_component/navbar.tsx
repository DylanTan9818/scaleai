import Image from "next/image";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const NavBar = () => {
  return (
    // Return me a navbar with a logo and a button in div. This is just a mock navbar
    <div className="flex justify-between items-center p-4 bg-white drop-shadow-sm">
      <Image src="/images/ScaleAI.svg" alt="scaleai" width={160} height={160} />
      <Button size="lg" asChild>
        <Link href="/dashboard">Get Started!</Link>
      </Button>
    </div>
  );
};

export default NavBar;
