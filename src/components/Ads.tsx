import Image from "next/image";
import React from "react";

const Ads: React.FC = () => {
  return (
    <div className="w-full h-20 flex items-center justify-center rounded-lg overflow-hidden relative">
      <Image
        src="/adsBg.jpg"
        alt="Advertisement"
        height={100}
        width={1000}
        className="object-cover w-full"
      />
    </div>
  );
};

export default Ads;
