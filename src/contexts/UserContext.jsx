import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  // State
  const [users, setUsers] = useState({
    data: [],
    login: '',
  });
  const [userLogin, setUserLogin] = useState({});

  // Context data
  const userContextData = {
    users,
    setUsers,
    userLogin,
    setUserLogin,
  };

  // Render DOM
  return (
    <UserContext.Provider value={userContextData}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
