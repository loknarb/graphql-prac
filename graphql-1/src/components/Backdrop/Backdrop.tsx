import React from "react";
import ReactDOM from "react-dom";

import "./Backdrop.css";
type Props = {
  onClick: () => void;
  open: boolean;
};
const Backdrop: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Props
> = ({ onClick, open }) => {
  const backDrop = document.getElementById("backdrop-root")!;
  return ReactDOM.createPortal(
    <div className={["backdrop", open ? "open" : ""].join(" ")} onClick={onClick} />,
    backDrop
  );
};

export default Backdrop;
