import React from "react";

import "./Toolbar.css";

const ToolBar: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
> = ({ children }) => <div className="toolbar">{children}</div>;

export default ToolBar;
