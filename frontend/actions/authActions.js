import fetch from "isomorphic-fetch";
import cookies from "js-cookie";
import next from "next";

export const signup = (user) => {
  return fetch(`${process.env.API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
export const signin = (user) => {
  return fetch(`${process.env.API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signout = (next) => {
  removeCookie("token");
  removeLocalStorage("user");
  next();

  return fetch(`${process.env.API}/signout`, {
    method: "GET",
  })
    .then((response) => {
      console.log("Sign out successful");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const setCookie = (key, value) => {
  if (process.browser) {
    cookies.set(key, value, { expires: 1 });
  }
};

export const removeCookie = (key) => {
  if (process.browser) {
    cookies.remove(key, {
      expires: 1,
    });
  }
};

export const getCookie = (key) => {
  if (process.browser) {
    return cookies.get(key);
  }
};

export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

// authenticate user by pass data to cookie and localStorage

export const authenticate = (data, next) => {
  setCookie("token", data.token);
  setLocalStorage("user", data.user);
  next();
};

// function for checking if authentication is there or notifier

export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};
