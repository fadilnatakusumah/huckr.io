import React from "react";
import Navbar from "../Navbar";

interface LayoutProps {
  children?: React.ReactNode;
}
function Layout({ children }: LayoutProps) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>

      <style jsx>{`
        .main-container {
          padding: 20px;
        }
      `}</style>
    </>
  );
}

export default Layout;
