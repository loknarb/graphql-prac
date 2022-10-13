import React from "react";

import Image from "./Image";
import "./Avatar.css";

type Props = {
  image: string;
  size: "small" | "medium" | "large";
};
const Avatar: React.FC<Props> = ({ size, image }) => (
  <div className="avatar" style={{ width: size + "rem", height: size + "rem" }}>
    <Image imageUrl={image} />
  </div>
);

export default Avatar;
