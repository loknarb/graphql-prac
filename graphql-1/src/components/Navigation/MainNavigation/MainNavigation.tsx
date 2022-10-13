import React from "react";
import { NavLink } from "react-router-dom";

import MobileToggle from "../MobileToggle/MobileToggle";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

import "./MainNavigation.css";
type Props = {
  onOpenMobileNav: () => void;
  isAuth: boolean;
  onLogout: () => void;
};
const MainNavigation: React.FC<Props> = ({ onOpenMobileNav, isAuth, onLogout }) => (
  <nav className="main-nav">
    <MobileToggle onOpen={onOpenMobileNav} />
    <div className="main-nav__logo">
      <NavLink to="/">
        <Logo />
      </NavLink>
    </div>
    <div className="spacer" />
    <ul className="main-nav__items">
      <NavigationItems
        isAuth={isAuth}
        onLogout={onLogout}
        mobile={false}
        onChoose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </ul>
  </nav>
);

export default MainNavigation;
