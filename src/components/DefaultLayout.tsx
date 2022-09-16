import { ReactElement } from "react";
import Navbar from "./Navbar";

const DefaultLayout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 md:px-8">{children}</main>
    </>
  );
};

export default DefaultLayout;
