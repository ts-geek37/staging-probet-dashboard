import Image from "next/image";
import Link from "next/link";

import HeaderClientActions from "./HeaderClientActions";
import HeaderNavClient from "./HeaderNavClient";

const Header = () => {
  return (
    <header className="relative">
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-gray-800 via-45% via-primary-green to-75% to-gray-800" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-2 nav:grid-cols-[1fr_3fr_1fr] items-center justify-between h-16">
        <Link href="/" className="h-6 w-36">
          <Image
            src="/logo.webp"
            alt="ProBetTips logo"
            width={150}
            height={24}
            priority
            className="size-full object-contain"
          />
        </Link>

        <HeaderNavClient />
        <HeaderClientActions />
      </div>
    </header>
  );
};

export default Header;
