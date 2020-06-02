import { useState, useEffect } from "react";
import Router from "next/router";

import styles from "./signin.module.css";
import { signin, authenticate, isAuth } from "../../../actions/authActions";

const SigninComponent = () => {
  const [values, setValues] = useState({
    email: "ryan@gmail.com",
    password: "rrrrrr",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  useEffect(() => {
    isAuth() && Router.push("/");
  });

  const { email, password, error, loading, message, showForm } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.table({ name, email, password, error, loading, message, showForm });
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        // save user token to cookie
        // save user info to localstorage
        // authenticate user
        authenticate(data, () => {
          Router.push("/");
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";
  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  const signinForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={email}
            type="email"
            placeholder="Type your email"
            className="form-control"
            onChange={handleChange("email")}
          />
        </div>

        <div className="form-group">
          <input
            value={password}
            type="password"
            placeholder="Type your password"
            className="form-control"
            onChange={handleChange("password")}
          />
        </div>
        <div className="form-group">
          <button className={`btn ${styles.primary}`}>Login</button>
        </div>
      </form>
    );
  };

  return (
    <React.Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signinForm()}
    </React.Fragment>
  );
};

export default SigninComponent;
