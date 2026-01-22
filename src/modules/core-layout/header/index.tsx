import Image from "next/image";
import Link from "next/link";

import HeaderClientActions from "./HeaderClientActions";
import HeaderNavClient from "./HeaderNavClient";

const Header = () => {
  return (
    <header className="relative">
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-linear-to-r from-gray-800 via-45% via-primary-green to-75% to-gray-800" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-2 nav:grid-cols-[1.2fr_3fr_1fr] items-center justify-between h-16">
        <Link href="/" className="h-9 w-60 focus-visible:outline-none">
          <Image
            src="/logo.webp"
            alt="ProBetPredictions logo"
            width={600}
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
