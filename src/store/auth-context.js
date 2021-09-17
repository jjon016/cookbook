import React, { useState } from 'react';
let logoutTimer;
const AuthContext = React.createContext({
  token: '',
  email: '',
  isLoggedIn: false,
  login: (email, token, expirationTime) => {},
  logout: () => {},
});
const calRemTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpTime = new Date(expirationTime).getTime();
  return adjExpTime - currentTime;
};

const retrieveStoredToken = () => {
  const initialToken = localStorage.getItem('token');
  const email = localStorage.getItem('email');
  const expTime = localStorage.getItem('expTime');
  const remTime = calRemTime(expTime);
  if (remTime <= 60000) {
    localStorage.removeItem('token');
    localStorage.removeItem('expTime');
    return null;
  } else {
    return { email: email, token: initialToken, remTime: remTime };
  }
};

export const AuthContextProvider = (props) => {
  const localData = retrieveStoredToken();
  let initialToken;
  let initialEmail;

  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expTime');
    localStorage.removeItem('email');
    setToken(null);
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };
  if (localData) {
    initialToken = localData.token;
    initialEmail = localData.email;
    logoutTimer = setTimeout(logoutHandler, localData.remTime);
  }

  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(initialEmail);

  const userIsLoggedIn = !!token;

  const loginHandler = (email, token, expirationTime) => {
    setToken(token);
    setEmail(email);
    localStorage.setItem('token', token);
    localStorage.setItem('expTime', expirationTime);
    localStorage.setItem('email', email);
    const remainingTime = calRemTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  const contextValue = {
    email: email,
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
