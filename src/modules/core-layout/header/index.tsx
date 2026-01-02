import Image from "next/image";
import Link from "next/link";

import HeaderClientActions from "./HeaderClientActions";
import HeaderNavClient from "./HeaderNavClient";

const Header = () => {
  return (
    <header className="relative">
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-gray-800 via-45% via-primary-green to-75% to-gray-800" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16">
        <Link href="/">
          <Image
            src="/logo.webp"
            alt="ProBet logo"
            width={1000}
            height={40}
            className="h-6 w-auto"
          />
        </Link>

        <HeaderNavClient />
        <HeaderClientActions />
      </div>
    </header>
  );
};

export default Header;
