import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

const AuthCtx = createContext(null);
export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("user");
    if (t) setToken(t);
    if (u) setUser(JSON.parse(u));
  }, []);

  const value = useMemo(
    () => ({ token, user, setToken, setUser }),
    [token, user]
  );
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
export function useAuth() {
  return useContext(AuthCtx);
}
