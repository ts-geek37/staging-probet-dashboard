import Image from "next/image";
import React from "react";

const Ads: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center rounded-lg overflow-hidden relative">
      <Image
        src="/adsBg.jpg"
        alt="Advertisement"
        height={100}
        width={1000}
        className="object-cover"
      />
    </div>
  );
};

export default Ads;
