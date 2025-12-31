import React from "react";

interface GroupLayoutProps {
  children: React.ReactNode;
}

const GroupLayout: React.FC<GroupLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
  );
};

export default GroupLayout;
