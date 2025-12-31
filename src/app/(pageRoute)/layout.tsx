import React from "react";

interface GroupLayoutProps {
  children: React.ReactNode;
}

const GroupLayout: React.FC<GroupLayoutProps> = ({ children }) => {
  return <div className="flex-1 flex flex-col p-4">{children}</div>;
};

export default GroupLayout;
