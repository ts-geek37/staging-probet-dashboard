import { cn } from "@/lib/utils";
import React from "react";

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
        "w-full h-50 flex items-center justify-center bg-[#14181F] border border-primary-gray/20 rounded-xl p-4 text-primary-gray text-sm",
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
