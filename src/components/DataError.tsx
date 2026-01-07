import React from "react";

interface DataErrorProps {
  message?: string;
}

const DataError: React.FC<DataErrorProps> = ({
  message = "Failed to load data",
}) => {
  return (
    <div className="w-full h-50 flex items-center justify-center bg-[#14181F] border border-primary-gray/20 rounded-xl p-4 text-primary-red text-sm sm:text-base">
      {message}
    </div>
  );
};

export default DataError;
