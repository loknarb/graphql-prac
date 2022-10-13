import React, { useState } from "react";

import Input from "../../components/Form/Input/Input";
import Button from "../../components/Button/Button";
import { required, length, email } from "../../util/validators";
import Auth from "./Auth";
type SignupForm = {
  email: { value: string };
  password: { value: string };
  name: { value: string };
};
type AuthData = {
  email: string;
  password: string;
  signupForm?: SignupForm;
};
type Props = {
  loading: boolean;
  onLogin: (event: React.FormEvent<HTMLFormElement>, authData: AuthData) => void;
};
const Login: React.FC<Props> = ({ loading, onLogin }) => {
  const [info, setInfo] = useState({
    loginForm: {
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
      formIsValid: false,
    },
  });

  const inputChangeHandler = (input: "email" | "password", value: string) => {
    // setInfo((prevState) => {
    let isValid = true;
    for (const validator of info.loginForm[input].validators) {
      isValid = isValid && validator(value);
    }
    const updatedForm = {
      ...info.loginForm,
      [input]: {
        ...info.loginForm[input],
        valid: isValid,
        value: value,
      },
    };
    let formIsValid = true;
    formIsValid = formIsValid && updatedForm["email"].valid && updatedForm["password"].valid;
    setInfo((prevState) => {
      return {
        ...prevState,
        loginForm: {
          ...updatedForm,
          formIsValid: formIsValid,
        },
      };
    });
  };

  const inputBlurHandler = (input: "email" | "password") => {
    setInfo({
      loginForm: {
        ...info.loginForm,
        [input]: {
          ...info.loginForm[input],
          touched: true,
        },
      },
    });
  };

  return (
    <Auth>
      <form
        onSubmit={(e) =>
          onLogin(e, {
            email: info.loginForm.email.value,
            password: info.loginForm.password.value,
          })
        }>
        <Input
          id="email"
          label="Your E-Mail"
          type="email"
          control="input"
          onChange={inputChangeHandler}
          onBlur={() => inputBlurHandler("email")}
          value={info.loginForm["email"].value}
          valid={info.loginForm["email"].valid}
          touched={info.loginForm["email"].touched}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          control="input"
          onChange={inputChangeHandler}
          onBlur={() => inputBlurHandler("password")}
          value={info.loginForm["password"].value}
          valid={info.loginForm["password"].valid}
          touched={info.loginForm["password"].touched}
        />
        <Button design="raised" type="submit" loading={loading}>
          Login
        </Button>
      </form>
    </Auth>
  );
};

export default Login;
