import { createContext, useContext, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [pinSet, setPinSet] = useState(null);  
 
  const login = async (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    setToken(token);
    setRole(role);

    try {
      const res = await api.get("/user/pin-status");
      setPinSet(res.data);  
    } catch {
      setPinSet(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    setPinSet(null);
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
