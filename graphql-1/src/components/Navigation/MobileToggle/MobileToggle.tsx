import React from "react";

import "./MobileToggle.css";
type Props = {
  onOpen: () => void;
};
const mobileToggle: React.FC<Props> = ({ onOpen }) => {
  return (
    <button className="mobile-toggle" onClick={onOpen}>
      <span className="mobile-toggle__bar" />
      <span className="mobile-toggle__bar" />
      <span className="mobile-toggle__bar" />
    </button>
  );
};

export default mobileToggle;
