import React from "react";

import NavigationItems from "../NavigationItems/NavigationItems";
import "./MobileNavigation.css";
type Props = {
  onChooseItem: () => void;
  onLogout: () => void;
  isAuth: boolean;
  open: boolean;
  mobile: boolean;
};
const mobileNavigation: React.FC<Props> = ({ open, mobile, onChooseItem, isAuth, onLogout }) => (
  <nav className={["mobile-nav", open ? "open" : ""].join(" ")}>
    <ul className={["mobile-nav__items", mobile ? "mobile" : ""].join(" ")}>
      <NavigationItems mobile onChoose={onChooseItem} isAuth={isAuth} onLogout={onLogout} />
    </ul>
  </nav>
);

export default mobileNavigation;
