import Image from "next/image";

import Ads from "@/components/Ads";

import LeagueListing from "./leagueListing";

const LeaguesBrowse = () => {
  return (
    <div className="max-w-7xl w-full mx-auto grid grid-cols-1 gap-5 sm:gap-16 py-10 px-5 sm:px-">
      <Ads />
      <LeagueListing />
      <Image
        src="/league/banner.png"
        alt="Leagues Banner"
        height={100}
        width={1000}
        className="w-full h-80 object-cover"
      />
    </div>
  );
};

export default LeaguesBrowse;
