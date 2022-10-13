import React from "react";

import "./Layout.css";
type Props = {
  header: React.ReactNode;
  mobileNav: React.ReactNode;
};
const Layout: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Props
> = ({ header, mobileNav, children }) => (
  <>
    <header className="main-header">{header}</header>
    {mobileNav}
    <main className="content">{children}</main>
  </>
);

export default Layout;
