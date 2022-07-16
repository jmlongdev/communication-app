import { Fragment } from "react";
import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  return (
    <section>
      <MainNavigation />
      <main>{props.children}</main>
    </section>
  );
};

export default Layout;
