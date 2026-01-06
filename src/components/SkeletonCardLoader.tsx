import React from "react";

interface SkeletonCardLoaderProps {
  height?: string;
}

const SkeletonCardLoader: React.FC<SkeletonCardLoaderProps> = ({
  height = "h-50",
}) => {
  return (
    <div
      className={`w-full ${height} flex items-center justify-center bg-[#14181F] border border-primary-gray/20 rounded-xl p-4 text-primary-gray text-sm`}
    >
      <div className="w-8 h-8 border-3 border-primary-gray border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default SkeletonCardLoader;
