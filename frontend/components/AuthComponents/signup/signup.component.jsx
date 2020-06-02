import { useState, useEffect } from "react";
import Router from "next/router";

import styles from "./signup.module.css";
import { signup, isAuth } from "../../../actions/authActions";

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "Ryan",
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

  const { name, email, password, error, loading, message, showForm } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.table({ name, email, password, error, loading, message, showForm });
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };

    signup(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          loading: false,
          message: data.message,
          showForm: false,
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

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={name}
            type="text"
            placeholder="Type your name"
            className="form-control"
            onChange={handleChange("name")}
          />
        </div>
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
          <button className={`btn ${styles.primary}`}>Signup</button>
        </div>
      </form>
    );
  };

  return (
    <React.Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signupForm()}
    </React.Fragment>
  );
};

export default SignupComponent;
