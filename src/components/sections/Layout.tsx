import React from "react";

// Components
import { Header } from "../index.js";

const Layout = ({ children }: any) => {
  return (
    <div>
      <Header />
      <main className="container mx-auto">{children}</main>
    </div>
  );
};

export default Layout;
