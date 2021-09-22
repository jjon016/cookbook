import React, { useState } from 'react';

let logoutTimer;
const AuthContext = React.createContext({
  token: '',
  email: '',
  sms: '',
  name: '',
  userId: '',
  cookbooks: [],
  isLoggedIn: false,
  login: (userId, token, expirationTime) => {},
  logout: () => {},
  setData: () => {},
});

const calRemTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpTime = new Date(expirationTime).getTime();
  return adjExpTime - currentTime;
};

const retrieveStoredToken = () => {
  const initialToken = localStorage.getItem('token');
  const initialUserId = localStorage.getItem('userId');
  const expTime = localStorage.getItem('expTime');
  const remTime = calRemTime(expTime);
  if (remTime <= 60000) {
    localStorage.removeItem('token');
    localStorage.removeItem('expTime');
    localStorage.removeItem('userId');
    return null;
  } else {
    return { userId: initialUserId, token: initialToken, remTime: remTime };
  }
};

export const AuthContextProvider = (props) => {
  const localData = retrieveStoredToken();
  let initialToken;
  let initialUserId;

  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expTime');
    localStorage.removeItem('userId');
    setToken(null);
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };
  if (localData) {
    initialToken = localData.token;
    initialUserId = localData.userId;
    logoutTimer = setTimeout(logoutHandler, localData.remTime);
  }
  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState('');
  const [sms, setSms] = useState('');
  const [name, setName] = useState('');
  const [userId, setUserId] = useState(initialUserId);
  const [cookbooks, setCookbooks] = useState([]);
  const userIsLoggedIn = !!token;

  const loginHandler = (userId, token, expirationTime) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem('token', token);
    localStorage.setItem('expTime', expirationTime);
    localStorage.setItem('userId', userId);
    const remainingTime = calRemTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  const setDataHandler = (data) => {
    if (data.email) {
      setEmail(data.email);
    }
    if (data.sms) {
      setSms(data.sms);
    }
    if (data.name) {
      setName(data.name);
    }
    if (data.cookbooks) {
      setCookbooks(data.cookbooks);
    }
  };

  const contextValue = {
    token: token,
    email: email,
    sms: sms,
    name: name,
    userId: userId,
    cookbooks: cookbooks,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    setData: setDataHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
