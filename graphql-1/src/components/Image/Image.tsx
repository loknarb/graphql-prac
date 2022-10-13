import React from "react";

import "./Image.css";
type Props = {
  imageUrl: string;
  contain?: boolean;
  left?: boolean;
};

const Image: React.FC<Props> = ({ imageUrl, contain, left }) => (
  <div
    className="image"
    style={{
      backgroundImage: `url('${imageUrl}')`,
      backgroundSize: contain ? "contain" : "cover",
      backgroundPosition: left ? "left" : "center",
    }}
  />
);

export default Image;
