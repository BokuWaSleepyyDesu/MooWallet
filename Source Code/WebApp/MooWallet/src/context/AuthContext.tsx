import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type User = {
  id: number;         // maps account_id
  email: string;
  name: string;
  type: string;
  phoneNo: string;    // maps phone_no
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // fetch real user info
      fetchUser(token);
    }
  }, []);

  async function fetchUser(token: string) {
    try {
      const response = await fetch("https://your-api.com/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      const data = await response.json();

      // Map API response to User type
      setUser({
        id: data.account_id,
        email: data.email,
        name: data.name,
        type: data.type,
        phoneNo: data.phone_no,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
