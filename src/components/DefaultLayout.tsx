import { ReactElement } from "react";

const DefaultLayout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <main className="container mx-auto">{children}</main>
    </>
  );
};

export default DefaultLayout;
