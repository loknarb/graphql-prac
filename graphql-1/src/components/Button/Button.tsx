import React from "react";
import { Link } from "react-router-dom";

import "./Button.css";

type Props = {
  mode?: "flat" | "raised";
  design?: "accent" | "danger";
  link?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
};
const Button: React.FC<Props> = ({
  link,
  onClick,
  design,
  mode,
  loading,
  disabled,
  type,
  children,
}) =>
  !link ? (
    <button
      className={["button", `button--${design}`, `button--${mode}`].join(" ")}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}>
      {loading ? "Loading..." : children}
    </button>
  ) : (
    <Link className={["button", `button--${design}`, `button--${mode}`].join(" ")} to={link}>
      {children}
    </Link>
  );

export default Button;
