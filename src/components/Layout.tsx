import React from "react";

const Layout = ({ children }: any) => {
  return (
    <div>
      <main className="container mx-auto">{children}</main>
    </div>
  );
};

export default Layout;
