"use client";

import React, { ReactNode } from "react";
import NavigationMenu from "@/components/NavigationMenu";
import TopNavBar from "@/components/TopNavBar";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <NavigationMenu />
      <TopNavBar />
      <div className="pl-64 pt-16">
        {children}
      </div>
    </>
  );
};

export default AppLayout; 