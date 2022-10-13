import React from "react";

import "./Loader.css";

const Loader: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
> = () => (
  <div className="loader">
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default Loader;
