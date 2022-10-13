import React, { Component, Fragment, useEffect, useState } from "react";
import { Route, Switch, Redirect, withRouter, useHistory } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Backdrop from "./components/Backdrop/Backdrop";
import Toolbar from "./components/Toolbar/Toolbar";
import MainNavigation from "./components/Navigation/MainNavigation/MainNavigation";
import MobileNavigation from "./components/Navigation/MobileNavigation/MobileNavigation";
import ErrorHandler from "./components/ErrorHandler/ErrorHandler";
import FeedPage from "./pages/Feed/Feed";
import SinglePostPage from "./pages/Feed/SinglePost/SinglePost";
import LoginPage from "./pages/Auth/Login";
import SignupPage from "./pages/Auth/Signup";
import "./App.css";
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
const App = () => {
  const [showBackDrop, setShowBackDrop] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }
    const userId = localStorage.getItem("userId");
    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
    setIsAuth(true);
    setToken(token);
    setUserId(userId);
    setAutoLogout(remainingMilliseconds);
  }, []);
  const setAutoLogout = (milliseconds: number) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };
  // componentDidMount() {
  //   const token = localStorage.getItem('token');
  //   const expiryDate = localStorage.getItem('expiryDate');
  //   if (!token || !expiryDate) {
  //     return;
  //   }
  //   if (new Date(expiryDate) <= new Date()) {
  //     this.logoutHandler();
  //     return;
  //   }
  //   const userId = localStorage.getItem('userId');
  //   const remainingMilliseconds =
  //     new Date(expiryDate).getTime() - new Date().getTime();
  //   this.setState({ isAuth: true, token: token, userId: userId });
  //   this.setAutoLogout(remainingMilliseconds);
  // }React.FormEvent<HTMLFormElement>
  const loginHandler = async (event: React.FormEvent<HTMLFormElement>, authData: AuthData) => {
    event.preventDefault();
    setAuthLoading(true);
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: authData.email,
          password: authData.password,
        }),
      });
      const resData = await response.json();
      if (resData.status === 422) {
        throw new Error("Validation failed.");
      } else if (resData.status !== 200 && resData.status !== 201) {
        console.log("Error!");
        throw new Error("Could not authenticate you!");
      }
      console.log(resData);
      setIsAuth(true);
      setToken(resData.token);
      setAuthLoading(false);
      setUserId(resData.userId);
      localStorage.setItem("token", resData.token);
      localStorage.setItem("userId", resData.userId);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem("expiryDate", expiryDate.toISOString());
      setAutoLogout(remainingMilliseconds);
    } catch (err: any) {
      setError(err);
      setAuthLoading(false);
      setIsAuth(false);
    } finally {
      setAuthLoading(false);
    }
  };
  const mobileNavHandler = () => {
    setShowMobileNav(true);
    setShowBackDrop(true);
  };

  const backdropClickHandler = () => {
    setShowBackDrop(false);
    setShowMobileNav(false);
    setError(null);
  };

  const logoutHandler = () => {
    setIsAuth(false);
    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  };

  const signupHandler = (event: React.FormEvent<HTMLFormElement>, signupForm: SignupForm) => {
    event.preventDefault();
    setAuthLoading(true);
    if (signupForm) {
      fetch("http://localhost:8080/auth/signup", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: signupForm.email.value,
          password: signupForm.password.value,
          name: signupForm.name.value,
        }),
      })
        .then((res) => {
          if (res.status === 422) {
            throw new Error("Validation failed. Make sure the email address isn't used yet!");
          }
          if (res.status !== 200 && res.status !== 201) {
            console.log("Error!");
            throw new Error("Creating a user failed!");
          }
          return res.json();
        })
        .then((resData) => {
          console.log(resData);
          // this.setState({ isAuth: false, authLoading: false });
          setIsAuth(false);
          setAuthLoading(false);
          history.replace("/");
        })
        .catch((err) => {
          console.log(err);
          // this.setState({
          //   isAuth: false,
          //   authLoading: false,
          //   error: err
          // });
          setIsAuth(false);
          setAuthLoading(false);
          setError(err);
        });
    }
  };
  const errorHandler = () => {
    // this.setState({ error: null });
    setError(null);
  };
  const loginAccess = (
    <Switch>
      <Route path="/" exact render={(props) => <FeedPage userId={userId} token={token} />} />
      <Route
        path="/:postId"
        render={(props) => <SinglePostPage {...props} userId={userId} token={token} />}
      />
      <Redirect to="/" />
    </Switch>
  );
  const noAccess = (
    <Switch>
      <Route
        path="/"
        exact
        render={(props) => <LoginPage {...props} onLogin={loginHandler} loading={authLoading} />}
      />
      <Route
        path="/signup"
        exact
        render={(props) => <SignupPage {...props} onSignup={signupHandler} loading={authLoading} />}
      />
      <Redirect to="/" />
    </Switch>
  );
  return (
    <>
      {showBackDrop && <Backdrop onClick={backdropClickHandler} />}
      <ErrorHandler error={error} onHandle={errorHandler} />
      <Layout
        header={
          <Toolbar>
            <MainNavigation
              onOpenMobileNav={mobileNavHandler}
              onLogout={logoutHandler}
              isAuth={isAuth}
            />
          </Toolbar>
        }
        mobileNav={
          <MobileNavigation
            open={showMobileNav}
            mobile
            onChooseItem={mobileNavHandler}
            onLogout={logoutHandler}
            isAuth={isAuth}
          />
        }
      />
      {isAuth ? loginAccess : noAccess}
    </>
  );
};

export default App;
