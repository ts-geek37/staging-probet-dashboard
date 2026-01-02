import React from "react";

interface GroupLayoutProps {
  children: React.ReactNode;
}

const GroupLayout: React.FC<GroupLayoutProps> = ({ children }) => {
  return <div className="flex-1 flex flex-col">{children}</div>;
};

export default GroupLayout;
