import {  createContext, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  function handleLoginOpen() {
    setIsLoginOpen(true);
  }

  function handleLoginClose() {
    setIsLoginOpen(false);
  }
  function handleRegisterOpen() {
    setIsRegisterOpen(true);
  }
  function handleRegisterClose() {
    setIsRegisterOpen(false);
  }
  return (
    <UserContext.Provider
      value={{
        isLoginOpen,
        handleLoginOpen,
        handleLoginClose,
        isRegisterOpen,
        handleRegisterOpen,
        handleRegisterClose,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
