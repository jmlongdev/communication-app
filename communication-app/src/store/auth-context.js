import React from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggenIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const contextValue = {
    token: token,
    isLoggenIn: userIsLoggenIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
