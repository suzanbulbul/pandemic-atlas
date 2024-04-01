import React from "react";
import { useRouter } from "next/router";

// Components
import Header from "./header";

const Layout = ({ children }: any) => {
  return (
    <div>
      <Header />
      <main className="container mx-auto">{children}</main>
    </div>
  );
};

export default Layout;
