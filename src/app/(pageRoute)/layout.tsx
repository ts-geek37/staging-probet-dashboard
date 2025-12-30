import React from "react";

interface GroupLayoutProps {
  children: React.ReactNode;
}

const GroupLayout: React.FC<GroupLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default GroupLayout;
