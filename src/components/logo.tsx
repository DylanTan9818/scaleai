import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
      <Link href="/">
        <Image
          src="/images/ScaleAI.svg"
          width={260}
          height={260}
          alt="KinderGuardian Logo"
        />
      </Link>
    </div>
  );
};
