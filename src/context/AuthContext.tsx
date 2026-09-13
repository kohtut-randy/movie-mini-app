import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  ReactNode,
} from "react";
import { AuthUser } from "@/lib/types";

const STORAGE_KEY = "auth.user";

/**
 * The session lives in localStorage, which is an external store. Reading it
 * through useSyncExternalStore keeps React in sync without an effect, and
 * makes the session shared across browser tabs.
 */
const sessionStore = {
  listeners: new Set<() => void>(),

  subscribe(listener: () => void) {
    sessionStore.listeners.add(listener);
    window.addEventListener("storage", listener);
    return () => {
      sessionStore.listeners.delete(listener);
      window.removeEventListener("storage", listener);
    };
  },

  /** Raw JSON string so the snapshot stays reference stable between renders. */
  getSnapshot(): string | null {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  },

  /** No session exists on the server or during hydration. */
  getServerSnapshot(): string | null {
    return null;
  },

  write(user: AuthUser | null) {
    if (user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    sessionStore.listeners.forEach((listener) => listener());
  },
};

const emptySubscribe = () => () => {};

export interface AuthContextValue {
  /** Logged in user, or null when signed out. */
  user: AuthUser | null;
  /** True until the stored session has been read on the client. */
  isLoading: boolean;
  isAuthenticated: boolean;
  /** Calls the login API and stores the session on success. */
  login: (email: string, password: string) => Promise<AuthUser>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const rawUser = useSyncExternalStore(
    sessionStore.subscribe,
    sessionStore.getSnapshot,
    sessionStore.getServerSnapshot,
  );

  // False on the server and on the first client render, true afterwards.
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const user = useMemo<AuthUser | null>(() => {
    if (!rawUser) return null;
    try {
      return JSON.parse(rawUser) as AuthUser;
    } catch {
      return null;
    }
  }, [rawUser]);

  const login = useCallback(async (email: string, password: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message ?? "Login failed");
    }

    const loggedInUser = data.user as AuthUser;
    sessionStore.write(loggedInUser);
    return loggedInUser;
  }, []);

  const logout = useCallback(() => {
    sessionStore.write(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading: !isHydrated,
      isAuthenticated: user !== null,
      login,
      logout,
    }),
    [user, isHydrated, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}
