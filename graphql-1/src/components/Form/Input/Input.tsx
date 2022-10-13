import React from "react";

import "./Input.css";

type Props = {
  label: string;
  id: "email" | "password" | "title";
  type?: string;
  control: "input" | "textarea";
  onChange: (id: Props["id"], value: string, files?: FileList | null) => void;
  onBlur: () => void;
  value: string;
  valid: boolean;
  touched: boolean;
  required?: boolean;
  rows?: string;
  placeholder?: string;
};
const Input: React.FC<Props> = ({
  label,
  control,
  id,
  valid,
  touched,
  type,
  required,
  value,
  rows,
  placeholder,
  onChange,
  onBlur,
}) => (
  <div className="input">
    {label && <label htmlFor={id}>{label}</label>}
    {control === "input" && (
      <input
        className={[!valid ? "invalid" : "valid", touched ? "touched" : "untouched"].join(" ")}
        type={type}
        id={id}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(id, e.target.value, e.target.files)}
        onBlur={onBlur}
      />
    )}
    {control === "textarea" && (
      <textarea
        className={[!valid ? "invalid" : "valid", touched ? "touched" : "untouched"].join(" ")}
        id={id}
        rows={parseInt(rows!)}
        required={required}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        onBlur={onBlur}
      />
    )}
  </div>
);

export default Input;
