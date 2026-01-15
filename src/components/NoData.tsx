import React from "react";

interface NoDataProps {
  message?: string;
}

const NoData: React.FC<NoDataProps> = ({ message = "Data not available" }) => {
  return (
    <div className="w-full h-50 flex items-center justify-center bg-[#14181F] border border-primary-gray/20 rounded-xl p-4 text-primary-gray text-sm">
      {message}
    </div>
  );
};

export default NoData;
