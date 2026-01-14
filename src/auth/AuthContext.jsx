import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [pinSet, setPinSet] = useState(
    localStorage.getItem("pinSet") === "true"
  );

  const login = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("pinSet", "false"); // 🔒 FORCE PIN
    setToken(token);
    setRole(role);
    setPinSet(false);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    setPinSet(false);
  };

  return (
    <AuthContext.Provider
      value={{ token, role, pinSet, setPinSet, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
