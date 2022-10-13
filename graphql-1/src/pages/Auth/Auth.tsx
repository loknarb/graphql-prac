import React from "react";

import "./Auth.css";

const auth: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>> = (
  props
) => {
  return <section className="auth-form">{props.children}</section>;
};

export default auth;
