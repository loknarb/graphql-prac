import React, { Component, useState } from "react";

import Input from "../../components/Form/Input/Input";
import Button from "../../components/Button/Button";
import { required, length, email } from "../../util/validators";
import Auth from "./Auth";
type SignupForm = {
  email: { value: string };
  password: { value: string };
  name: { value: string };
};

// type AuthData = {
//   email: string;
//   password: string;
//   signupForm?: SignupForm;
// };
type Props = {
  loading: boolean;
  onSignup: (event: React.FormEvent<HTMLFormElement>, signupForm: SignupForm) => void;
};
const Signup: React.FC<Props> = ({ loading, onSignup }) => {
  const [signupForm, setSignupForm] = useState({
    email: {
      value: "",
      valid: false,
      touched: false,
      validators: [required, email],
    },
    password: {
      value: "",
      valid: false,
      touched: false,
      validators: [required, length({ min: 5 })],
    },
    name: {
      value: "",
      valid: false,
      touched: false,
      validators: [required],
    },
    formIsValid: false,
  });

  const inputChangeHandler = (input: "email" | "password" | "name", value: string) => {
    let isValid = true;
    for (const validator of signupForm[input].validators) {
      isValid = isValid && validator(value);
    }
    const updatedForm = {
      ...signupForm,
      [input]: {
        ...signupForm[input],
        valid: isValid,
        value: value,
      },
    };
    let formIsValid = true;
    updatedForm["formIsValid"] =
      formIsValid &&
      updatedForm["email"].valid &&
      updatedForm["password"].valid &&
      updatedForm["name"].valid;
    setSignupForm({
      ...updatedForm,
    });
    // signupForm: updatedForm,
    // formIsValid: formIsValid
  };

  const inputBlurHandler = (input: "email" | "password" | "name") => {
    setSignupForm({
      ...signupForm,
      [input]: {
        ...signupForm[input],
        touched: true,
      },
    });
  };

  return (
    <Auth>
      <form onSubmit={(e) => onSignup(e, signupForm)}>
        <Input
          id="email"
          label="Your E-Mail"
          type="email"
          control="input"
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler.bind("email")}
          value={signupForm["email"].value}
          valid={signupForm["email"].valid}
          touched={signupForm["email"].touched}
        />
        <Input
          id="name"
          label="Your Name"
          type="text"
          control="input"
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler.bind("name")}
          value={signupForm["name"].value}
          valid={signupForm["name"].valid}
          touched={signupForm["name"].touched}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          control="input"
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler("password")}
          value={signupForm["password"].value}
          valid={signupForm["password"].valid}
          touched={signupForm["password"].touched}
        />
        <Button design="raised" type="submit" loading={loading}>
          Signup
        </Button>
      </form>
    </Auth>
  );
};

export default Signup;
