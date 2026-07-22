"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  clearSession,
  getSession,
  setSession as persistSession,
  type AuthUser,
} from "./loginUtils";

interface AuthContextValue {
  user: AuthUser | null;
  initialized: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Deferred to an effect (rather than lazy initial state) so the client
    // render matches the server's null-user render before hydration reads
    // localStorage. Consumers must wait for `initialized` before treating a
    // null user as "logged out" — otherwise a child page's mount effect can
    // redirect to /login before this effect has had a chance to run.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(getSession());
    setInitialized(true);
  }, []);

  const login = (nextUser: AuthUser) => {
    persistSession(nextUser);
    setUser(nextUser);
  };

  const logout = () => {
    clearSession();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, initialized, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
