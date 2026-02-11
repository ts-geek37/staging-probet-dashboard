import React from "react";

import { cn } from "@/lib/utils";

interface NoDataProps {
  message?: string;
  isCenter?: boolean;
  className?: string;
}

const NoData: React.FC<NoDataProps> = ({
  message = "Data not available",
  isCenter = false,
  className = "",
}) => {
  const content = () => (
    <div
      className={cn(
        "w-full h-32 flex items-center justify-center bg-[#14181F] border border-primary-gray/20 rounded-xl p-4 text-primary-gray text-sm",
        className,
      )}
    >
      {message}
    </div>
  );
  return (
    <>
      {isCenter ? (
        <div className="w-full flex-1 max-w-7xl px-4 mx-auto flex items-center justify-center">
          {content()}
        </div>
      ) : (
        content()
      )}
    </>
  );
};

export default NoData;
