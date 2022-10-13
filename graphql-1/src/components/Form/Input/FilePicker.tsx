import React from "react";

import "./Input.css";

const filePicker = (props: {
  id: string;
  label: string;
  valid: boolean;
  touched: boolean;
  onBlur: () => void;
  onChange: (id: string, value: string, files: FileList | null) => void;
  control: "input" | "textarea";
}) => (
  <div className={`${props.control}`}>
    <label htmlFor={props.id}>{props.label}</label>
    <input
      className={[!props.valid ? "invalid" : "valid", props.touched ? "touched" : "untouched"].join(
        " "
      )}
      type="file"
      id={props.id}
      onChange={(e) => props.onChange(props.id, e.target.value, e.target.files)}
      onBlur={props.onBlur}
    />
  </div>
);

export default filePicker;
